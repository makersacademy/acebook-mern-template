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
        setEmail(''); setPassword(''); setFirstName(''); setLastName('');
      } else {
        navigate("/login");
      }
    });
  };

  return (
    <div className="signup-form-container">
      <form onSubmit={handleSubmit} class="signup-form">
        <div className='signup-form-header'>
        <h1 className="form-title">Create a new account</h1>
        <p>It's quick and easy</p>
        </div>
        <div>
          <input
            placeholder="First Name"
            id="first-name"
            class="signup-form-input"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            placeholder="Last Name"
            id="last-name"
            class="signup-form-input"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div>
          <input
            placeholder="Email"
            id="email"
            class="signup-form-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Password"
            id="password"
            class="signup-form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <input class="signup-form-btn" type="submit" value="Sign Up" />
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
