import React, { useEffect, useState } from "react";
import useGetCurrentUser from "../../../hooks/getCurrentUser";

import "./Profile.css";
import { useSearchParams } from "react-router-dom";
import ProfileTemplate from "./ProfileTemplate";
const Profile = ({ navigate }) => {
  /*
    Contains Single User Profile Details.
    Displays Feed related to viewed profile.
    If user is not currently authenticated, redirects to login page.

    @Children:
        - Feed
    */

  //Access query param by hook.
  const [searchParams, setSearchParams] = useSearchParams();
  const firstName = searchParams.get("firstName");
  const lastName = searchParams.get("lastName");

  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [currentUserId, setCurrentUserId] = useState(
    window.localStorage.getItem("currentUserID")
  );
  // useEffect sets up profile User if query params are present.
  const [profileUser, setProfileUser] = useState("");
  //getUserHook returns curent user and hes followers togheter with its set up functions
  const [currentUser, setCurrentUser, following, setFollowing] =
    useGetCurrentUser(currentUserId);

  useEffect(() => {
    if (firstName && lastName) {
      fetch(`/api/users?firstName=${firstName}&lastName=${lastName}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then(async (data) => {
          window.localStorage.setItem("token", data.token);
          setToken(window.localStorage.getItem("token"));
          setProfileUser(data.user);
        });
    }
  }, [firstName, lastName]);

  if (profileUser) {
    return (
      <ProfileTemplate
        user={profileUser}
        currentUserId={currentUserId}
        following={following}
        setFollowing={setFollowing}
      ></ProfileTemplate>
    );
  } else if (currentUser) {
    return (
      <ProfileTemplate
        user={currentUser}
        currentUserId={currentUserId}
      ></ProfileTemplate>
    );
  } else {
    navigate("/login");
  }
};

export default Profile;
