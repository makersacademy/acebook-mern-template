import React, { useState } from "react";
import "./SignUpForm.css";

const SignUpForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [passwordsMatchError, setPasswordsMatchError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== "") {
      setShowConfirmation(true);
    } else {
      submitForm();
    }
  };

  const submitForm = () => {
    fetch("/users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
      }),
    }).then((response) => {
      if (response.status === 201) {
        navigate("/login");
      } else {
        navigate("/signup");
      }
    });
  };

  const handleConfirm = () => {
    if (confirmPassword === password) {
      setShowConfirmation(false);
      setPasswordsMatchError(false); // Reset error state when password is correct
      submitForm();
    } else {
      setPasswordsMatchError(true);
      const inputBox = document.getElementById("confirmPassword");
      inputBox.classList.add("error");
    }
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-header">
        <p>Please complete the details below to create your account:</p>
      </div>

      <div className="form-group">
        <div className="aligned-credentials">
          <div className="email-box-space">
            <input
              placeholder="Email"
              id="email"
              type="text"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="password-box-space">
            <input
              placeholder="Password"
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
        </div>
      </div>

      <div className="form-group">
        <div className="aligned-names">
          <div className="first-name-box-space">
            <input
              placeholder="First Name"
              id="firstName"
              type="text"
              value={firstName}
              onChange={handleFirstNameChange}
              required
            />
          </div>
          <div className="last-name-box-space">
            <input
              placeholder="Last Name"
              id="lastName"
              type="text"
              value={lastName}
              onChange={handleLastNameChange}
              required
            />
          </div>
        </div>
      </div>

      <div className="form-group">
        <input id="submit" type="submit" value="Become a Moangoose" />
      </div>

      {showConfirmation && (
        <div className="confirmation-popup">
          <input
            placeholder="Confirm Password"
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {passwordsMatchError && (
            <p className="error-message">Passwords don't match</p>
          )}
          <div className="confirmation-buttons">
            <button type="button" onClick={handleConfirm}>
              Confirm
            </button>
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default SignUpForm;
