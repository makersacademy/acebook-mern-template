import React from "react";
import "./LoginForm.css";
import Modal from "../common/Modal";

const LogOutForm = ({ onClose, setIsUserLoggedIn }) => {
  const handleConfirm = () => {
    window.localStorage.removeItem("token");
    setIsUserLoggedIn(false);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal open={true} onClose={onClose}>
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <div className="logout-form">
          <h2>Are you sure you want to log out?</h2>
          <div className="logout-buttons">
            <button onClick={handleConfirm}>Yes</button>
            <button onClick={handleCancel}>No</button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default LogOutForm;
