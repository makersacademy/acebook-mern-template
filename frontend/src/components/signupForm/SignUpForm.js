import React, { useState } from "react";
import "./SignUpForm.css";

const SignUpForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

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

  return (
    <div className="signup-form-container">
      <form onSubmit={handleSubmit} class="signup-form">
        <h1 class="form-title">Signup</h1>
        <div>
          <input
            placeholder="Email"
            id="email"
            class='signup-form-input'
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Password"
            id="password"
            class='signup-form-input'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="First Name"
            id="first-name"
            class='signup-form-input'
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Last Name"
            id="last-name"
            class='signup-form-input'
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <div>
          <input class='signup-form-btn' type="submit" value="Submit" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
