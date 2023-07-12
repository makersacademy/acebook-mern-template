import React, { useState } from "react";
import "./LoginForm.css";
import Modal from "../common/Modal";
import jwt_decode from "jwt-decode";

const LogInForm = ({ navigate, onClose, handleSuccessfulLogin, setUserId }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch("/tokens", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });

    if (response.status !== 201) {
      console.log("yay");
    } else {
      console.log("oop");
      let data = await response.json();
      window.localStorage.setItem("token", data.token);
      const token = window.localStorage.getItem("token");
      const decodedToken = jwt_decode(token);
      setUserId(decodedToken.user_id);
      onClose(); // Close the form when the submission is successful
      handleSuccessfulLogin();
      navigate("/");
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <Modal open={true} onClose={onClose}>
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <form className="login-form" onSubmit={handleSubmit}>
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
          <input id="submit" type="submit" value="Submit" />
        </form>
      </div>
    </Modal>
  );
};

export default LogInForm;
