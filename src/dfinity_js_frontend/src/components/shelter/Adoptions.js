import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import Loader from "../utils/Loader";
import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { NotificationSuccess, NotificationError } from "../utils/Notifications";

import {
  getAdoptionRecords as getAdoptionsList,
  completeAdoption,
  failAdoption,
} from "../../utils/petAdoption";
import AdoptionInfo from "./Adoption";
import Nav from "./Nav";

const Adoptions = () => {
  const [adoptions, setAdoptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAdoptions = useCallback(async () => {
    try {
      setLoading(true);
      setAdoptions(await getAdoptionsList());
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  });

  const complete = async (id) => {
    try {
      setLoading(true);
      await completeAdoption(id);
      fetchAdoptions();
      console.log(id);
      toast(<NotificationSuccess text="Adoption completed successfully" />);
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to complete adoption" />);
    } finally {
      setLoading(false);
    }
  };

  const fail = async (id) => {
    try {
      setLoading(true);
      await failAdoption(id);
      fetchAdoptions();
      toast(<NotificationSuccess text="Adoption failed successfully" />);
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to fail adoption" />);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdoptions();
  }, []);

  return (
    <>
      {!loading ? (
        <>
          <div className="">
            <Nav />
          </div>
          <Row xs={1} sm={2} lg={3} className=" pt-4 pl-2">
            {adoptions.map((_adoptions, index) => (
              <AdoptionInfo
                key={index}
                adoption={{
                  ..._adoptions,
                }}
                complete={complete}
                fail={fail}
              />
            ))}
          </Row>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Adoptions;
