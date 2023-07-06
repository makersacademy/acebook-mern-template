import { Link } from "react-router-dom";
import React from "react";
// import './ProfileButton.css';

const ProfileButton = () => {
  return (
    <Link to="/profile">
      <button className="profile-button">Profile</button>
    </Link>
  );
};

export default ProfileButton;
