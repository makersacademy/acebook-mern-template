import React from "react";

const Notification = ({ notification }) => {
  return (
    <div className="notification">
      <p>{notification.message}</p>
    </div>
  );
};

export default Notification;
