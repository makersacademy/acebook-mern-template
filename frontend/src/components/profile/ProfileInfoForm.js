import React, { useState } from "react";

const ProfileInfoForm = (props) => {
  const [name, setName] = useState(props.currentData.name || "");
  const [bio, setBio] = useState(props.currentData.bio || "");

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedData = {
      name,
      bio,
    };

    fetch("/profiles", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.token}`,
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response data:", data);
        if (data.message) {
          props.onProfileDataChange();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
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
  );
};

export default ProfileInfoForm;
