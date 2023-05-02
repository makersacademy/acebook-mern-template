import React from "react";
import styles from "./SubmitButton.css";

const SubmitButton = (props) => {
  const { id, text, form } = props;

  return (
    <button id={id} className="submit-button" type="submit" form={form}>
      {text}
    </button>
  );
};

export default SubmitButton;
