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
    <div className="form">
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
          />
        </div>
        <div className="password-box-space">
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

    <div className="form-group">
      <div className="aligned-names">
        <div className="first-name-box-space">
          <input
            placeholder="First Name"
            id="firstName"
            type="text"
            value={firstName}
            onChange={handlefirstNameChange}
          />
        </div>
        <div className="last-name-box-space">
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

    <div className="form-group">
      <input id="submit" type="submit" value="Submit" />
    </div>
  </form>
  </div>
  );
};

export default SignUpForm;
