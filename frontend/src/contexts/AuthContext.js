import React, { useEffect, createContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({});

  useEffect(() => {
    const storedToken = window.localStorage.getItem("token");

    const getUser = async () => {
      const response = await fetch("/users", {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        window.localStorage.setItem("token", data.token);
        setToken(data.token);
        setUser(data.user);
      } else {
        setToken(null);
      }
    };

    if (storedToken) {
      getUser();
    }
  }, []);

  const context = useMemo(() => ({ token, setToken, user, setUser }), [token]);

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AuthContextProvider;
