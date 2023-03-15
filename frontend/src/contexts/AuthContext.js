import React, { useEffect, createContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [user, setUser] = useState({});

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
        console.log(data.user);
      }
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const context = useMemo(() => ({ token, setToken, user }), [token]);

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AuthContextProvider;
