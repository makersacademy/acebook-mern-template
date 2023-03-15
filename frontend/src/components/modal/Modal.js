import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "../../helpers/classNames";

const Modal = ({ message, type, remove }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleRemoveItem = () => {
    remove();
    setIsFadingOut(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(handleRemoveItem, 500);
    }, 3000);
  }, []);

  return (
    <div
      className={classNames(
        type === "success"
          ? "bg-green-50 text-green-800"
          : "bg-red-50 text-red-800",
        isFadingOut ? "animate-fade-out" : "animate-fade-in",
        "rounded-lg p-4 text-sm"
      )}
      data-cy="modal"
    >
      {message}
    </div>
  );
};

Modal.propTypes = {
  message: PropTypes.string.isRequired,
  remove: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["success", "error"]).isRequired,
};

export default Modal;
