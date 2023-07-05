import React, { useState } from "react";
import "./SignUpForm.css";
import Modal from "../common/Modal";

const SignUpForm = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch("/users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        username: username,
      }),
    }).then((response) => {
      if (response.status === 201) {
        onClose(); // Close the modal on successful submission
      }
    });
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <Modal open={true} onClose={onClose}>
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <div className="signup-form">
          <form onSubmit={handleSubmit}>
            <label>
              <input
                placeholder="Email"
                id="email"
                type="text"
                value={email}
                onChange={handleEmailChange}
              />
            </label>
            <label>
              <input
                placeholder="Password"
                id="password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </label>
            <label>
              <input
                placeholder="Username"
                id="username"
                type="text"
                value={username}
                onChange={handleUsernameChange}
              />
            </label>
            <input id="submit" type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default SignUpForm;
