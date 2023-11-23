import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";

const LoggedOut = ({ children }) => {
  const location = useLocation();
  const [showNavBar, setShowNavBar] = useState(false);

  useEffect(() => {
    const hiddenPages = ['/posts', '/profile'];
    if (hiddenPages.includes(location.pathname)) {
      setShowNavBar(false);
    } else {
      setShowNavBar(true);
    }
  }, [location]);

  return <div>{showNavBar && children}</div>;
};

export default LoggedOut;