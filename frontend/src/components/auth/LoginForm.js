import React, { useState } from "react";
import errorHandlerEmail from "../errorHandling/errorHandlerEmail";
import errorHandlerPassword from "../errorHandling/errorHandlerPassword";
import errorHandlerUsersName from "../errorHandling/errorHandlerUsersName";

const LogInForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (email === "" || password === "") return;
    if (
      !email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) ||
      !password.match(/^[a-zA-Z0-9]{4,25}$/)
    )
      return;

    let response = await fetch("/tokens", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });

    if (response.status !== 201) {
      navigate("/login");
    } else {
      let data = await response.json();
      window.localStorage.setItem("token", data.token);

      navigate("/posts");
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <h1>Log-in</h1>
      <form onSubmit={handleSubmit}>
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
        <input role="submit-button" id="submit" type="submit" value="Submit" />
      </form>
      <div id="ErrorMessageEmail">{errorHandlerEmail(email)}</div>

      <div id="ErrorMessagePassword">{errorHandlerPassword(password)}</div>
    </>
  );
};

export default LogInForm;
