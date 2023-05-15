import React, { useState } from "react";
import './SignUpForm.css';

const SignUpForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");

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

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlefirstNameChange = (event) => {
    setfirstName(event.target.value);
  };

  const handlelastNameChange = (event) => {
    setlastName(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
    <div class="form-header">
      <p>Please complete the details below to create your account:</p>
    </div>

    <div class="form-group">
      <div class="aligned-credentials">
        <div class="email-box-space">
          <input
            placeholder="Email"
            id="email"
            type="text"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div class="password-box-space">
          <input
            placeholder="Password"
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
      </div>
    </div>

    <div class="form-group">
      <div class="aligned-names">
        <div class="first-name-box-space">
          <input
            placeholder="First Name"
            id="firstName"
            type="text"
            value={firstName}
            onChange={handlefirstNameChange}
          />
        </div>
        <div class="last-name-box-space">
          <input
            placeholder="Last Name"
            id="lastName"
            type="text"
            value={lastName}
            onChange={handlelastNameChange}
          />
        </div>
      </div>
    </div>

    <div class="form-group">
      <input id="submit" type="submit" value="Submit" />
    </div>
  </form>
  );
};

export default SignUpForm;
