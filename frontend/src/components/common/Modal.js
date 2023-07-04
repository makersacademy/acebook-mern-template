import React from "react";
import ReactDOM from "react-dom";
import "./Modal.css"; // Be sure to include CSS for modal

const Modal = ({ children, open, onClose }) => {
  if (!open) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-body">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("portal") // Consider an element with id 'portal' exists in your HTML
  );
};

export default Modal;
