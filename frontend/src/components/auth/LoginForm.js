import React, { useState } from 'react';
import './LoginForm.css';
import { Link } from 'react-router-dom';

const LogInForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

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
      <div className="login">
        <form onSubmit={handleSubmit} className="login-form">
          <h1>Sign In Form</h1>
          <input placeholder='Email' id="email" type='text' value={ email } onChange={handleEmailChange} />
          <input placeholder='Password' id="password" type='password' value={ password } onChange={handlePasswordChange} />
          <button role='submit-button' id='submit' type="submit" value="Submit">Sign In</button>
          <p>Do you not have an account with us yet?</p>
          <p>Sign up <Link to="/signup" className="signup-link">HERE</Link></p>
        </form>
      </div>
      </>
    );
}

export default LogInForm;
