import React, { useEffect, useState } from "react";
import "./Profile.css";
import Feed from "../../feed/Feed";
import { Form, useSearchParams } from "react-router-dom";

const Profile = ({ navigate }) => {
  /*
    Contains Single User Profile Details.
    Displays Feed related to viewed profile.
    If user is not currently authenticated, redirects to login page.

    @Children:
        - Feed
    */

  //Access query param by hook.
  const [searchParams, setSearchParams] = useSearchParams();
  const firstName = searchParams.get("firstName");
  const lastName = searchParams.get("lastName");

  //Api URl var, api url is different for currenty log profile page and other ppl profile we want to view.
  let apiUrl;

  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [currentUserId, setCurrentUserId] = useState(
    window.localStorage.getItem("currentUserID")
  );
  const [profileUser, setProfileUser] = useState("");

  const [followers, setFollowers] = useState([]);

  const handleFollow = (event) => {
    // TODO: 
    // If profileUserId in followers:
      // Remove from followers
    // Else
      //Add to followers
      
  // Fetch Update

    // fetch(`/api/users/update`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ followers: followers, userId: currentUserId }),
    // });
  };

  useEffect(() => {
    //If query params find other profile.
    if (firstName && lastName) {
      apiUrl = `/api/users?firstName=${firstName}&lastName=${lastName}`;
      // Else view Your own profile.
    } else {
      apiUrl = `/api/users/${currentUserId}`;
    }

    if (token) {
      fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then(async (data) => {
          window.localStorage.setItem("token", data.token);
          setToken(window.localStorage.getItem("token"));
          setProfileUser(data.user);
          // TODO: Set Followers to currently logged user followers
          
        });
    } else {
      navigate("/login");
    }
  }, []);

  if (token && profileUser) {
    return (
      <div className="profile-container">
        <h1>My profile</h1>
        {/* Profile picture */}
        <img src="profileImg.webp" className="profilePic" alt="thumb" />
        <h2 data-cy="names">
          {/* Username data */}
          {profileUser.firstName} {profileUser.lastName}
        </h2>
        <div className="button-container">
          {/* Edit/Share profile */}
          {/* TODO: Add Edit Profile link */}
          {profileUser._id == currentUserId ? (
            <button className="primary-btn m-btn">Edit Profile</button>
          ) : (
            <form onSubmit={handleFollow}>
              <button className="primary-btn m-btn" type="submit">
                Follow
              </button>
            </form>
          )}
          {/* TODO: Add Edit Share link */}
          <button className="primary-btn">Share Profile</button>
        </div>
        <div className="profile-info row">
          {/* Number of Posts/Followers/Following Info */}
          <div className="col">
            <span>
              <strong>{profileUser.posts.length}</strong>
            </span>
            <span>Posts</span>
          </div>
          <div className="col">
            <span>
              <strong>{profileUser.followers.length}</strong>
            </span>
            <span>Followers</span>
          </div>
          <div className="col">
            <span>
              {/* TODO: Change to followers when Model Updated */}
              <strong>{profileUser.followers.length}</strong>
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
