import React, { useEffect, useState } from "react";

const NavBar = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const getUser = async () => {
    if (token) {
      const response = await fetch("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        // error
      } else {
        const data = await response.json();
        window.localStorage.setItem("token", data.token);
        setToken(data.token);
        setUser(data.user);
        console.log(`user: ${user}`);
      }
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return <div className="bg-gray-800">{user.username}</div>;
};

export default NavBar;
