import { Link } from "react-router-dom";
import React from "react";
// import './ProfileButton.css';

const ProfileButton = ({ userId }) => {
  return (
    <Link to={`/profiles/${userId}`}>
      <button className="profile-button">Profile</button>
    </Link>
  );
};

export default ProfileButton;
