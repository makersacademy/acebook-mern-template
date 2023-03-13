import React, { useState } from "react";
import "./LoginForm.css"

const LogInForm = ({ navigate }) => {
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

    if (response.status === 201) {
      console.log("yay");
      let data = await response.json();
      window.localStorage.setItem("token", data.token);
      navigate("/posts");
    } else {
      console.log("oops");
      navigate("/login");
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h3>Welcome back 👋</h3>


      
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
      <input role="submit-button" id="submit" type="submit" value="Login" />
    </form>
  );
};

export default LogInForm;
