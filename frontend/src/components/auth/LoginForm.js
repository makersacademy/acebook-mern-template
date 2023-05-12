import React, { useState } from 'react';
import NavBar from '../nav/Nav.js';
import './LoginForm.css';

const LogInForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (email === "" || password === "") {
      alert('Please enter a valid email and password.');
      return;
    }

    let response = await fetch( '/tokens', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password })
    })

    if(response.status !== 201) {
      console.log("yay")
      navigate('/login')
    } else {
      console.log("oop")
      let data = await response.json()
      window.localStorage.setItem("token", data.token)
      navigate('/posts');
    }
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  return (
    <>
    <NavBar />
    <div className="centered-box">
      <h1>Login</h1><br></br> 
      <p>Please enter your login details.</p><br></br>
      <form onSubmit={handleSubmit}>
        <input placeholder='Email' id="email" type='text' value={ email } onChange={handleEmailChange} /><br></br>
        <input className="input-field" placeholder='Password' id="password" type='password' value={ password } onChange={handlePasswordChange} /><br></br>
        <input role='submit-button' id='submit' type="submit" value="Login" />
      </form>
    </div>
    </>
  );
}

export default LogInForm;
