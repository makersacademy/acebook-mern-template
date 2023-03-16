import React, { createContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const context = useMemo(() => ({ token, setToken }), [token]);

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AuthContextProvider;
