import "./profile.css";
import React, { useState } from "react";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const Profile = ({ user }) => {
  const [imageUpload, setImageUpload] = useState(null);
  const [image, setImage] = useState("");

  const UploadImage = (event) => {
    event.preventDefault();
    if (imageUpload == null) return;
    const imageRef = ref(storage, `profilepics/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImage(url);
        console.log("Url", url);

        fetch("/users", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            imageURL: url,
          }),
        });
      });
    });
  };

  return (
    <div>
      <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <button
        onClick={(event) => {
          UploadImage(event);
        }}
      >
        Upload <del> Vain Selfie </del> Profile Pic!
      </button>{" "}
      <img
        src="https://www.kindpng.com/picc/m/421-4212623_gd-avatar-alien-circle-hd-png-download.png"
        alt="Avatar"
        className="avatar"
      />
      <br></br>
    </div>
  );
};

export default Profile;
