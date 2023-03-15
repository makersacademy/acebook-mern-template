import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const UserInfo = () => {
  const [user, setUser] = useState({});
  const { token, setToken } = useContext(AuthContext);

  const getUser = async () => {
    if (token) {
      const response = await fetch("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.status !== 200) {
        // error
      } else {
        window.localStorage.setItem("token", data.token);
        setToken(data.token);
        setUser(data.user);
      }
    }
  };

  useEffect(() => {
    getUser();
  }, []);
};

export default UserInfo;
