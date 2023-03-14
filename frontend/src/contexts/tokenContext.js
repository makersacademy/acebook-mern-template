import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";

export const TokenContext = React.createContext();

const TokenContextProvider = ({ children }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const context = useMemo(() => ({ token, setToken }), [token]);

  return (
    <TokenContext.Provider value={context}>{children}</TokenContext.Provider>
  );
};

TokenContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default TokenContextProvider;
