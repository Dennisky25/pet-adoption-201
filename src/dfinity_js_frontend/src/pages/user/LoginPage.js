import React, { useCallback, useEffect, useState } from "react";

import { login, logout as destroy } from "../../utils/auth";
import { Notification } from "../../components/utils/Notifications";
import Cover from "../../components/utils/Cover";
import coverImg from "../../assets/img/sandwich.jpg";
import Loader from "../../components/utils/Loader";

import { getUserOwner } from "../../utils/petAdoption";
import Home from "./Home";
import UserProfile from "../../components/users/CreateUserProfile";
const UsersLogin = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const isAuthenticated = window.auth.isAuthenticated;

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      setUser(
        await getUserOwner().then(async (res) => {
          //console.log(res);
          return res.Ok;
        })
      );
      setLoading(false);
    } catch (error) {
     console.log("user not added");
      setLoading(false);
    }
  });

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <Notification />
      {isAuthenticated ? (
        !loading ? (
          user?.name ? (
            <main>
            <Home user={user} />
            </main>
          ) : (
            <UserProfile fetchUser={fetchUser} />
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
export default UsersLogin;
