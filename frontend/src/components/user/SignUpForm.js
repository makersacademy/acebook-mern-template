import React, { useState } from "react";

const SignUpForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState({ email: "", password: "" });

  const handleSubmit = async event => {
    event.preventDefault();

    if (!validateEmail() || !validatePassword()) {
      setEmail("");
      setPassword("");
      return;
    }

    fetch("/users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    }).then(response => {
      if (response.status === 201) {
        navigate("/login");
      } else if (response.status === 400) {
        setValidationError({ password: "Bad request" });
      } else {
        navigate("/signup");
      }
    });
  };

  const validateEmail = () => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const validEmail = re.test(email);

    if (validEmail) {
      setValidationError({ email: "", password: "" });
      return true;
    } else {
      setValidationError({ email: "Email address is not valid" });
      return false;
    }
  };

  const validatePassword = () => {
    if (password.length > 0) {
      setValidationError({ email: "", password: "" });
      return true;
    } else {
      setValidationError({ password: "Invalid password" });
      return false;
    }
  };

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email: </label>
          <input placeholder="Email" id="email" type="text" value={email} onChange={handleEmailChange} />
          <p className="validation-error">{validationError?.email}</p>
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input placeholder="Password" id="password" type="password" value={password} onChange={handlePasswordChange} />
          <p className="validation-error">{validationError?.password}</p>
        </div>

        <input id="submit" type="submit" value="Submit" />
      </form>
    </>
  );
};

export default SignUpForm;
