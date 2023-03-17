import React, { useState } from "react";
import "./SignUpForm.css";

const SignUpForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
   
    fetch("/users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password, name: name, avatar: avatar }),
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

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleAvatarChange = (event) => {
    setAvatar(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <h3>Create your account 🎉</h3>
      
     
      <input
        placeholder="Email"
        id="email"
        type="email"
        value={email}
        onChange={handleEmailChange}
        className="input-field"
      />
      
      <input
        placeholder="Password"
        id="password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
        className="input-field"
      />
      
      <input
        placeholder="Name"
        id="name"
        type="text"
        value={name}
        onChange={handleNameChange}
        className="input-field"
      />
      <input
        placeholder="Avatar Number (1-5)"
        id="avatar"
        type="text"
        value={avatar}
        onChange={handleAvatarChange}
        className="input-field"
      />
      <input id="submit" type="submit" value="Sign up" className="submit-button" />
    </form>
   
  );
};

export default SignUpForm;
