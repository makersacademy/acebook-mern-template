import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "../button/Button";

const Modal = ({ title, subText, type, id }) => {
  const [isShown, setIsShown] = useState(true);
  const [timerId, setTimerId] = useState(null);

  const toggleModal = () => {
    setIsShown(!isShown);
  };

  useEffect(() => {
    if (isShown) {
      const newId = setTimeout(() => {
        toggleModal();
      }, 5000);
      setTimerId(newId);
    }

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
      setTimerId(null);
    };
  }, []);

  const styleModal = () => {
    if (type === "success") {
      return "ring-green-400";
    }
    return "ring-red-500";
  };

  const buttonStyle = () => {
    if (type === "fail") {
      return "cancel";
    }
    return "";
  };
  return (
    <div>
      {isShown && (
        <div
          className="fixed inset-0 z-10 flex w-full items-center justify-center bg-gray-500/75 p-2 transition-opacity"
          id="modal"
          data-cy="modal"
        >
          <div
            id={id}
            className={`${styleModal()} min-h-min items-end justify-center space-y-2 overflow-y-auto rounded-lg bg-gray-50 p-4 ring-2`}
          >
            <div className="mt-4">
              <p className=" text-xl font-bold text-gray-900">{title}</p>
            </div>
            <div>
              <p className="text-sm text-gray-800">{subText}</p>
            </div>
            <div className="object-bottom">
              <Button
                text="Close"
                id="close-modal"
                className="mt-4 max-w-xs"
                buttonStyle={buttonStyle()}
                clickCallback={toggleModal}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  subText: PropTypes.string,
  type: PropTypes.oneOf(["success", "fail"]).isRequired,
  id: PropTypes.string.isRequired,
};

Modal.defaultProps = {
  subText: "",
};

export default Modal;
