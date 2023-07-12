import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "../post/Post";

const Profile = ({ navigate }) => {
  const [user, setUser] = useState({
    email: "",
  });
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const params = useParams();

  useEffect(() => {
    if (token) {
      fetch(`/users/${params.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then(async (data) => {
          window.localStorage.setItem("token", data.token);
          setToken(window.localStorage.getItem("token"));
          setUser(data.user);
        });
    }
  }, []);

  if (token) {
    return (
      <>
        <h1>Profile page</h1>
        <h2>Email: {user.email}</h2>
      </>
    );
  } else {
    navigate("/login");
  }
};

export default Profile;
