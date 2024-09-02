import React, { useCallback, useEffect, useState } from "react";
import { login, logout as destroy } from "../../utils/auth";
import { Notification, NotificationError, NotificationSuccess } from "../../components/utils/Notifications";
import Cover from "../../components/utils/Cover";
import coverImg from "../../assets/img/sandwich.jpg";
import Loader from "../../components/utils/Loader";

import { getAdoptionRecords as getAdoptionsList, getAdoption, updateAdoption, getAdoptionRecord, updateAdoptionRecord } from "../../utils/petAdoption";
 
import AdoptionApplication from "../../components/users/AdoptionRecords";
import { toast } from "react-toastify";
import Nav from "../../components/users/Nav";

const Application = () => {
const [adoption, setAdoption] = useState({});
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

 const fetchAdoption = useCallback(async () => {
      try {
        setLoading(true);
        const adoption = await getAdoptionRecord();
        setAdoption(adoption);
      } catch (error) {
        console.log({ error });
      } finally {
        setLoading(false);
      }
    }
    );

    
  const update = async (adoptionRecord) => {
    try {
      setLoading(true);
      await updateAdoptionRecord(adoptionRecord);
      fetchAdoptions();
      toast(<NotificationSuccess text="Adoption updated successfully" />);
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to update adoption" />);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
 
    fetchAdoptions();
    fetchAdoption();
    
  }, []);

  return (
    <>
    {!loading ? (
      
      <div>
        <Nav />
        <Cover img={coverImg} title="Adoption Application" />
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              {adoptions.map((adoption, index) => (
                <AdoptionApplication
                  key={index}
                  adoption={adoption}
                  update={update}
                />
              )
              )}
            </div>
          </div>
        </div>
      </div>
    ) : (
      <Loader />
    )}
    
    </>
  );
};
export default Application;
