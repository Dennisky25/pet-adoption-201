import React, { useCallback, useEffect, useState } from "react";
import { login, logout as destroy } from "../../utils/auth";
import { Notification } from "../../components/utils/Notifications";
import Cover from "../../components/utils/Cover";
//import coverImg from "../../assets/img/sandwich.png";
import coverImg from "../../assets/img/HUSKY1.png";
import Loader from "../../components/utils/Loader";
import { getShelterOwner } from "../../utils/petAdoption";


import SinginShelter from "../../components/shelter/SinginShelter";
import Home from "./Home";


const ShelterLogin = () => {
  const [shelter, setShelter] = useState({});
  const [loading, setLoading] = useState(false);

  const isAuthenticated = window.auth.isAuthenticated;

  const fetchShelter = useCallback(async () => {
    try {
      setLoading(true);
      setShelter(
        await getShelterOwner().then(async (res) => {
          //console.log(res);
          return res.Ok;
        })
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  });

  useEffect(() => {
    fetchShelter();
  }, []);

  return (
    <>
      <Notification />
      {isAuthenticated ? (
        !loading ? (
          shelter?.name ? (
            <main>
               <Home shelter={shelter} /> 
            </main>
          ) : (
            <SinginShelter fetchShelter={fetchShelter} />
          )
        ) : (
          <Loader />
        )
      ) : (
        <Cover name="Street Food" login={login} coverImg={coverImg} />
      )}
    </>
  );
};
export default ShelterLogin;
