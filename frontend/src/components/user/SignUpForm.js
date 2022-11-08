import React, { useState } from "react";
import errorHandlerEmail from "../errorHandling/errorHandlerEmail";
import errorHandlerUsersName from "../errorHandling/errorHandlerUsersName";
import errorHandlerPassword from "../errorHandling/errorHandlerPassword";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import "./profile.css";

const SignUpForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usersName, setUsersName] = useState("");
  const [profilePicUpload, setImageUpload] = useState(null);
  const [profilePicURL, setImage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (email === "" || password === "" || usersName === "") return;
    if (
      !email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) ||
      !password.match(/^[a-zA-Z0-9]{4,25}$/) ||
      !usersName.match(/^[a-z ,.'-]*$/i)
    )
      return;
    if (!usersName.match(/^[a-z ,.'-]*$/i)) return;

    if (profilePicUpload == null) return;
    const imageRef = ref(storage, `images/${profilePicUpload.name + v4()}`);
    uploadBytes(imageRef, profilePicUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImage(url);
      });
    });

    fetch("/users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email: email,
        password: password,
        usersName: usersName,
        profilePic: profilePicURL,
      }),
    }).then((response) => {
      if (response.status === 201) {
        navigate("/login");
      } else {
        navigate("/signup");
      }
    });
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleUsersNameChange = (event) => {
    setUsersName(event.target.value);
  };

  return (
    <>
      <h1>Sign-up</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          id="email"
          type="text"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          placeholder="Password"
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <input
          placeholder="Name"
          id="usersName"
          type="text"
          value={usersName}
          onChange={handleUsersNameChange}
        />
        <input id="submit" type="submit" value="Submit" />
        <input
          type="file"
          onChange={(event) => {
            setImageUpload(event.target.files[0]);
          }}
        />
        {/* <button
          onClick={(event) => {
            UploadProfilePic(event);
          }}
        >
          Upload Photo
        </button>{" "} */}
      </form>
      <div id="ErrorMessageEmail">{errorHandlerEmail(email)}</div>
      <div id="ErrorMessagePassword">{errorHandlerPassword(password)}</div>
      <div id="ErrorMessagePassword">{errorHandlerUsersName(usersName)}</div>
    </>
  );
};

export default SignUpForm;
