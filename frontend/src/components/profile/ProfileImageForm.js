import React, { useState } from "react";
import Modal from "../common/Modal";

const ProfileImageForm = ({ onClose, userId, token, onProfileImageChange }) => {
  const [image, setImage] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    if (image) {
      formData.append("image", image);
    }

    fetch(`/profiles/${userId}/profileImage`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response data:", data);
        if (data.message) {
          onProfileImageChange();
          setImage(null);
        }
        onClose();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Modal open={true} onClose={onClose}>
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <p>Choose a new profile picture:</p>
        <form className="profile-image-form" onSubmit={handleSubmit}>
          <input
            className="profile-image-input"
            type="file"
            accept="image/*"
            onChange={(event) => setImage(event.target.files[0])}
          />
          <button className="profile-image-button" type="submit">
            Update Profile Image
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default ProfileImageForm;
