import React, { useState } from "react";
import Modal from "../common/Modal"; // Import the modal component
import Notification from "../notification/Notification"; // Import the notification component

const NotificationButton = ({ notifications }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <button onClick={handleOpenModal}>Notifications</button>

      <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
        {notifications.map((notification) => (
          <Notification notification={notification} key={notification._id} />
        ))}
      </Modal>
    </>
  );
};

export default NotificationButton;
