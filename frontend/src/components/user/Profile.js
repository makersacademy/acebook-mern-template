import React, { useEffect, useState } from "react";
import "./Profile.css";
import Feed from "../feed/Feed";

const Profile = ({ navigate }) => {
  /*
    Contains Single User Profile Details.
    Displays Feed related to viewed profile.
    If user is not currently authenticated, redirects to login page.

    @Children:
        - Feed
    */

  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [currentUserId, setCurrentUserId] = useState(
    window.localStorage.getItem("currentUserID")
  );
  const [currentUser, setCurrentUser] = useState("");

  //Set current user based on userId stored in the browser.
  useEffect(() => {
    if (token) {
      fetch(`/api/users/${currentUserId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then(async (data) => {
          window.localStorage.setItem("token", data.token);
          setToken(window.localStorage.getItem("token"));
          setCurrentUser(data.user);
        });
    } else {
      navigate("/login");
    }
  }, []);

  if (token && currentUser) {
    return (
      <div className="profile-container">
        <h1>My profile</h1>
        {/* Profile picture */}
        <img src="profileImg.webp" className="profilePic" alt="thumb" />
        <h2>
        {/* Username data */}
          {currentUser.firstName} {currentUser.lastName}
        </h2>
        <div className="button-container">
        {/* Edit/Share profile */}
          <button className="primary-btn m-btn">Edit Profile</button>
          <button className="primary-btn">Share Profile</button>
        </div>
        <div className="profile-info row">
        {/* Number of Posts/Followers/Following Info */}
          <div className="col">
            <span>
              <strong>{currentUser.posts.length}</strong>
            </span>
            <span>Posts</span>
          </div>
          <div className="col">
            <span>
              <strong>{currentUser.followers.length}</strong>
            </span>
            <span>Followers</span>
          </div>
          <div className="col">
            <span>
              {/* TODO: Change to followers when Model Updated */}
              <strong>{currentUser.followers.length}</strong>
            </span>
            <span>Following</span>
          </div>
        </div>

        {/* Profile feed */}
        {/* TODO: Change to Your Profile Feed */}
        <div className="feed-container">
          <Feed />
        </div>
      </div>
    );
  } else {
    navigate("/login");
  }
};

export default Profile;
