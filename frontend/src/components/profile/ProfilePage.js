import React, { useState } from "react";
import "./ProfilePage.css";

function Profile() {
  const bannerUrl =
    "https://venngage-wordpress.s3.amazonaws.com/uploads/2018/10/28.-Screen-Shot-2018-09-27-at-8.23.58-AM.png";
  const pictureUrl =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  return (
    <div>
      <header className="header">
        <button className="header-button">Back to Feed</button>
        <button className="header-button">Logout</button>
      </header>

      <div className="banner">
        <img src={bannerUrl} alt="Banner" className="banner-picture" />
        <div className="profile-picture-container">
          <img src={pictureUrl} alt="Profile" className="profile-picture" />
        </div>
      </div>

      <div className="user-info-container">
        <div className="user-data">
          <h2>Name: John Doe</h2>
          <h2>Username: johndoe123</h2>
          <h2>
            Bio: 🌟 Dreamer | 📚 Book Lover | 🌍 Wanderlust | 💡 Curious coder.
          </h2>
          <h2>Followers: 1000</h2>
        </div>
      </div>

      <div className="my-posts-container">
        <h2>My Posts</h2>
        <div className="my-posts">{/* Placeholder for posts */}</div>
        <div className="create-post"></div>
      </div>
    </div>
  );
}

export default Profile;
