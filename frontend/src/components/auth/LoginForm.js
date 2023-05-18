import React, { useState, useContext, useEffect } from 'react';
import './LoginForm.css';
import {loggedInContext} from '../app/App'


const LogInForm = ({ navigate }) => {
  const [loggedIn, setLoggedIn] = useContext(loggedInContext)
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
      console.log(data)
      window.localStorage.setItem("token", data.token)
      setLoggedIn(true)
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
      <div className="login-form">
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
