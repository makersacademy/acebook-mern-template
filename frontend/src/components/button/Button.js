import React from "react";
import PropTypes from "prop-types";

const Button = ({ text, fc }) => {
  return (
    <button
      className="rounded-lg border-2 border-blue-500 p-2 font-bold text-blue-500"
      type="button"
      onClick={fc}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  fc: PropTypes.func.isRequired,
};

export default Button;
