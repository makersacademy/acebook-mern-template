import React, { useState } from "react";
import SubmitButton from "../submitButton/SubmitButton";
import styles from "./SignUpForm.css";

const SignUpForm = ({ navigate }) => {
  // const [imgURL, setImgURL] = useState("");
  const [image, setImage] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function postImage({image}) {
    const formData = new FormData();
    formData.append("image", image)
  ;}

  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch("/api/users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, email: email, password: password }),
    }).then((response) => {
      if (response.status === 201) {
        navigate("/login");
      } else {
        navigate("/signup");
      }
    });
  };

  // const handleImgURLChange = (event) => {
  //   setImgURL(event.target.value);
  // };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <section className="signup">
      <form id="signup" onSubmit={handleSubmit}>
      {/* <input
          placeholder="img"
          id="img"
          type="file"
          value={imgURL}
          onChange={handleImgURLChange}
        /> */}
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
        <SubmitButton form="signup" text="Sign Up" />
      </form>
    </section>
  );
};

export default SignUpForm;
