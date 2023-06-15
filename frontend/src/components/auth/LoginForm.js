import React, { useState } from "react";
import "./LoginForm.css";
import { Link } from "react-router-dom";
import profile from "./profile.png";

const LogInForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState({ email: "", password: "" });

  const handleSubmit = async event => {
    event.preventDefault();

    if (validateEmail() && validatePassword()) {
      let response = await fetch("/tokens", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });

      if (response.status !== 201) {
        setValidationError({ password: "Username and password do not match" });
        // navigate("/login");
      } else {
        let data = await response.json();
        window.localStorage.setItem("token", data.token);
        navigate("/posts");
      }
    }
  };

  const validateEmail = () => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const validEmail = re.test(email);

    if (validEmail) {
      setValidationError({ email: "", password: "" });
      return true;
    } else {
      setValidationError(prevState => ({ ...prevState, email: "Email address is not valid" }));
      return false;
    }
  };

  const validatePassword = () => {
    if (password.length > 0) {
      setValidationError({ email: "", password: "" });
      return true;
    } else {
      setValidationError(prevState => ({ ...prevState, password: "Invalid password" }));
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
      <div className="main">
          <div className="sub-main">
         <div>
           <h1>Login</h1>
          <div>

      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="email"></label>
          <input className="auth-input" placeholder="Email" id="email" type="email" value={email} onChange={handleEmailChange} />
          <p className="validation-error">{validationError?.email}</p>
        </div>
        <div>
          <label htmlFor="email"></label>
          <input className="auth-input" placeholder="Password" id="password" type="password" value={password} onChange={handlePasswordChange} />
          <p className="validation-error">{validationError?.password}</p>
        </div>

        <div>
        <input id="submit" type="submit" value="Login" />
        </div>
      </form>

      <div>
        <p> Don't have an account? <Link to="/signup">Sign Up</Link></p>
      </div>
      </div>
      </div>
          </div>
      </div>
    </>
  )
};

export default LogInForm;
