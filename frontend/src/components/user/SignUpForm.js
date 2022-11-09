import React, { useState } from "react";
import errorHandlerEmail from "../errorHandling/errorHandlerEmail";
import errorHandlerUsersName from "../errorHandling/errorHandlerUsersName";
import errorHandlerPassword from "../errorHandling/errorHandlerPassword";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import "./signUp.css";

const SignUpForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usersName, setUsersName] = useState("");
  const [profilePicUpload, setProfilePicUpload] = useState(null);
  let profilePicURL = [];

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

    await UploadProfilePic();

    await fetch("/users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email: email,
        password: password,
        usersName: usersName,
        profilePic: profilePicURL[0],
      }),
    }).then((response) => {
      if (response.status === 201) {
        navigate("/login");
      } else {
        navigate("/signup");
      }
    });
  };

  const UploadProfilePic = async (event) => {
    return new Promise((resolve, reject) => {
      const imageRef = ref(
        storage,
        `profilePics/${profilePicUpload.name + v4()}`
      );
      uploadBytes(imageRef, profilePicUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          profilePicURL.push(url);
          resolve();
        });
      });
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
      <center>
        <h1>Sign-up</h1>
        <br />
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Email"
            id="email"
            type="text"
            value={email}
            onChange={handleEmailChange}
          />
          <br />
          <br />
          <input
            placeholder="Password"
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />{" "}
          <br />
          <br />
          <input
            placeholder="Name"
            id="usersName"
            type="text"
            value={usersName}
            onChange={handleUsersNameChange}
          />
          <br />
          <br />
          <input id="submit" type="submit" value="Submit" /> <br />
          <br />
          <label for="file-upload" className="custom-file-upload">
            Choose your <s>vein seflie</s> beautiful profile pic!
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={(event) => {
              setProfilePicUpload(event.target.files[0]);
            }}
          />
        </form>
        <br></br>
        <div id="ErrorMessageEmail">{errorHandlerEmail(email)}</div>
        <div id="ErrorMessagePassword">{errorHandlerPassword(password)}</div>
        <div id="ErrorMessagePassword">{errorHandlerUsersName(usersName)}</div>
      </center>
    </>
  );
};

export default SignUpForm;
