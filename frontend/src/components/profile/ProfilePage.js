import React, { useState, useEffect } from "react";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    // Fetch profile data
    fetch("/profiles", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProfileData(data);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  }, []);

  if (!profileData) {
    return <div>Loading profile...</div>;
  }

  const { name, username, bio, followers } = profileData;

  return (
    <div>
      <header className="header">
        <h1>My Profile</h1>
      </header>

      <div className="banner">
        <img
          src={profileData.bannerUrl}
          alt="Banner"
          className="banner-picture"
        />
        <div className="profile-picture-container">
          <img
            src={profileData.pictureUrl}
            alt="Profile"
            className="profile-picture"
          />
        </div>
      </div>

      <div className="user-info-container">
        <div className="user-data">
          <h2>Name: {name}</h2>
          <h2>Username: {username}</h2>
          <h2>Bio: {bio}</h2>
          <h2>Followers: {followers}</h2>
        </div>
      </div>

      <div className="my-posts-container">
        <h2>My Posts</h2>
        <div className="my-posts">{/* Placeholder for posts */}</div>
        <div className="create-post"></div>
      </div>
    </div>
  );
};

export default ProfilePage;
