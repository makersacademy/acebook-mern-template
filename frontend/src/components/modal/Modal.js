import React from "react";
import PropTypes from "prop-types";

const Modal = ({ message, style }) => {
  const checkStyle = () => {
    if (style === "success") {
      return "bg-green-50 text-green-800";
    }
    return "bg-red-50 text-red-800";
  };

  return (
    <div className={`${checkStyle()} mb-4 rounded-lg p-4 text-sm`}>
      {message}
    </div>
  );
};

Modal.propTypes = {
  message: PropTypes.string.isRequired,
  style: PropTypes.string.isRequired,
};

export default Modal;
