import React from "react";
import styles from "./SubmitButton.css";

const SubmitButton = (props) => {
  const { text, form } = props;


  return (
    <button
      className="submit-button"
      type="submit"
      form={form}>{text}</button>
  );
};

export default SubmitButton;
