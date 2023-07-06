import React, { useState, useEffect } from "react";
import Modal from "../common/Modal";
import Notification from "../notification/Notification";

const NotificationModal = ({ onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      fetch("/notifications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => setNotifications(data.notifications))
        .catch((error) => {
          console.error(
            "There has been a problem with your fetch operation:",
            error
          );
        });
    }
  }, [token]);

  return (
    <Modal open={true} onClose={onClose}>
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <div className="notifications-list">
          {notifications.map((notification) => (
            <div className="notification-item" key={notification._id}>
              <Notification notification={notification} />
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default NotificationModal;
