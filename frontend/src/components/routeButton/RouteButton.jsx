import React from "react";
import styles from "./RouteButton.css";

const RouteButton = (props) => {
  const { navigate, routePath, text } = props;

  const link = () => {
    navigate(routePath );
  };

  return (
    <button className="route-button" onClick={link}>
      {text}
    </button>
  );
};

export default RouteButton;
