import React from "react";
import styles from "./SubmitButton.css";

const submitButton = (props) => {
  const { navigate, routePath, text, form } = props;

  const link = () => {
    navigate(routePath);
  };

  return (
    <button
      className="submit-button"
      onClick={link}
      type="submit"
      value={text}
      form={form}></button>
  );
};

export default submitButton;
