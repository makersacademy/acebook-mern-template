import React, { useState } from "react";
import SubmitButton from "../submitButton/SubmitButton";
import styles from "./SignUpForm.css";

const SignUpForm = ({ navigate }) => {
  const [file, setFile] = useState();
  const [imgURL, setImgURL] = useState(
    "https://acebook-brachiosauruses.s3.eu-north-1.amazonaws.com/93ff7f683548f25693ac389aefb1f755"
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [popout, setPopout] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFileChange = (event) => {
    event.preventDefault();
    const newFile = event.target.files[0];
    setFile(newFile);
  };

  const handleStoreFile = (event) => {
    event.preventDefault();
    console.log(file);
    const formData = new FormData();
    formData.append("file", file);
    console.log(formData.getAll("file"));
    fetch("/api/images", {
      method: "post",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setImgURL(data.url);
      })
      .then(setPopout(false));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch("/api/users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imageURL: imgURL,
        name: name,
        email: email,
        password: password,
      }),
    }).then((response) => {
      if (response.status === 201) {
        navigate("/login");
      } else {
        navigate("/signup");
      }
    });
  };

  const displayPopout = () => {
    if (popout === true) {
      return (
        <div className="signup-popout-container">
          <div className="signup-popout">
            <form
              id="popout"
              className="signup-popout-form"
              onSubmit={handleStoreFile}>
              <input
                className="signup-popout-file"
                type="file"
                value=""
                onChange={handleFileChange}
                accept="image/*"
              />
            </form>
            <SubmitButton id="image-submit" form="popout" text="Upload Photo" />
          </div>
        </div>
      );
    } else {
      return;
    }
  };

  return (
    <section className="signup">
      {displayPopout()}
      <div className="signup-upload-container">
        <div className="signup-img-container">
          <img
            src={imgURL}
            alt="Profile picture goes here."
            className="signup-img"></img>
        </div>
        <button
          className="signup-image-button"
          onClick={() => {
            setPopout(true);
          }}>
          UPDATE PHOTO
        </button>
      </div>
      <div className="signup-form-container">
        <form id="signup" className="signup-form" onSubmit={handleSubmit}>
          <input
            placeholder="Name"
            id="name"
            type="text"
            value={name}
            onChange={handleNameChange}
          />
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
          <SubmitButton id="user-submit" form="signup" text="Sign Up" />
        </form>
      </div>
    </section>
  );
};

export default SignUpForm;
