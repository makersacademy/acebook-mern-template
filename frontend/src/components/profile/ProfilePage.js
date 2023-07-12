import React, { useState, useEffect } from "react";
import ProfileImageForm from "./ProfileImageForm";
import ProfileInfoForm from "./ProfileInfoForm";
import Modal from "../common/Modal"; // Import your Modal component
import "./ProfilePage.css";

const ProfilePage = ({ userId, onClose }) => {
  const [profileData, setProfileData] = useState(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [profileImageSrc, setProfileImageSrc] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = () => {
    fetch(`/profiles/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProfileData(data);
        setName(data.name);
        setBio(data.bio);

        if (data.image) {
          fetch(`/profiles/${userId}/profileImage`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
            .then((response) => response.blob())
            .then((blob) => {
              const objectURL = URL.createObjectURL(blob);
              setProfileImageSrc(objectURL);
            })
            .catch((error) => {
              console.error("Error fetching profile image:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  };

  const handleProfileDataChange = () => {
    fetchProfileData();
  };

  const handleProfileImageChange = () => {
    fetchProfileData();
  };

  if (!profileData) {
    return <div>Loading profile...</div>;
  }

  const { username, followers } = profileData;

  return (
    <div className="container">
      <header className="header">
        <h1>My Profile</h1>
      </header>

      <div className="banner">
        <div className="profile-picture-container">
          <div className="profile-photo">
            <img
              src={profileImageSrc}
              alt="Profile"
              className="profile-picture"
            />
          </div>
          <button
            className="change-image-button"
            onClick={() => setShowImageModal(true)}
          >
            Change Image
          </button>
        </div>
      </div>

      <div className="user-info-container">
        <h2 className="name">{name}</h2>
        <p className="username">@{username}</p>
        <p className="followers">{followers} Followers</p>
        <p className="bio">{bio}</p>
        <button onClick={() => setShowInfoModal(true)}>Edit Profile</button>
      </div>

      {/* Modals for image and info forms */}
      {showImageModal && (
        <ProfileImageForm
          token={localStorage.getItem("token")}
          onProfileImageChange={handleProfileImageChange}
          userId={userId}
          onClose={() => setShowImageModal(false)}
        />
      )}
      {showInfoModal && (
        <ProfileInfoForm
          token={localStorage.getItem("token")}
          onProfileDataChange={handleProfileDataChange}
          currentData={profileData}
          userId={userId}
          onClose={() => setShowInfoModal(false)}
        />
      )}

      <div className="my-posts-container">
        <h2>My Posts</h2>
        <div className="my-posts">{/* Placeholder for posts */}</div>
      </div>
    </div>
  );
};

export default ProfilePage;
