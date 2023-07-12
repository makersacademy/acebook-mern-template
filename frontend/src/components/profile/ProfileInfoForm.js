import React, { useState, useEffect } from "react";
import Modal from "../common/Modal";

const ProfileInfoForm = ({
  onClose,
  userId,
  token,
  currentData,
  onProfileDataChange,
}) => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    if (currentData) {
      setName(currentData.name || "");
      setBio(currentData.bio || "");
    }
  }, [currentData]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedData = {
      name,
      bio,
    };

    fetch(`/profiles/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response data:", data);
        if (data.message) {
          onProfileDataChange();
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
        <form className="profile-info-form" onSubmit={handleSubmit}>
          <label>Name: </label>
          <input
            className="profile-info-input"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <label>Bio: </label>
          <textarea
            className="profile-info-textarea"
            value={bio}
            onChange={(event) => setBio(event.target.value)}
          />

          <button className="profile-info-button" type="submit">
            Update Profile Info
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default ProfileInfoForm;
