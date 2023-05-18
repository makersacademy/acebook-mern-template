import React, { useState } from 'react';
import './LoginForm.css';

const LogInForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch("/tokens", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });

    if (response.status !== 201) {
      console.log("yay");
      setErrorMessage("Email or password is incorrect, please try again."); 
      navigate("/login");
    } else {
      console.log("oop");
      let data = await response.json();
      window.localStorage.setItem("token", data.token);

      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 1 * 24 * 60 * 60 * 1000);

      let cookieValue = encodeURIComponent('token') + "=" + encodeURIComponent(data.token);
      cookieValue += "; expires=" + expirationDate.toUTCString();
      cookieValue += "; path=/"; // Optional: set the cookie path

      document.cookie = cookieValue;

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
    <div className='login-container'>
      <form className='login-form' onSubmit={handleSubmit}>
        <div className='form-input'>
          <input placeholder='Email' id="email" type='text' value={email} onChange={handleEmailChange} />
        </div>
        <div className='form-input'>
          <input placeholder='Password' id="password" type='password' value={password} onChange={handlePasswordChange} />
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>} 
        <div className='login-button-container'>
          <input className='login-button' role='submit-button' id='submit' type="submit" value="Login" />
        </div>
      </form>
    </div>
  );
}

export default LogInForm;
