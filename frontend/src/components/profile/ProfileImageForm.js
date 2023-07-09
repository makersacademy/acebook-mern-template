import React, { useState } from "react";

const ProfileImageForm = (props) => {
  const [image, setImage] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    if (image) {
      formData.append("image", image);
    }

    fetch(`/profiles/${props.userId}/profileImage`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response data:", data);
        if (data.message) {
          props.onProfileImageChange();
          setImage(null);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
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
  );
};

export default ProfileImageForm;
