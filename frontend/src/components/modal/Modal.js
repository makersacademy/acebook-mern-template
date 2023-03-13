import React from "react";
import PropTypes from "prop-types";

const Modal = ({ message, type }) => {
  const checkStyle = () => {
    if (type === "success") {
      return "bg-green-50 text-green-800";
    }
    return "bg-red-50 text-red-800";
  };

  return (
    <div
      className={`${checkStyle()} mb-4 rounded-lg p-4 text-sm`}
      data-cy="modal"
    >
      {message}
    </div>
  );
};

Modal.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "error"]).isRequired,
};

export default Modal;
