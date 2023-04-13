import React, { useState } from 'react';
import './Login.css'

const LogInForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    if (!email || !password) return
    
    event.preventDefault();

    let response = await fetch( '/tokens', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password })
    })

    if (response.status === 401) {
        setErrorMessage('Email address is incorrect. Try again!');
    } else if (response.status === 402) {
        setErrorMessage('Password is incorrect. Try again!');
    } else {
        let data = await response.json()
        console.log(data)
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
    <div id='signup-god-container'>
      <div id='signup-navbar-container'>
        <nav id="signup-navbar">
          <h1>ACEBOOK</h1>
        </nav>
      </div>
      <div id='login-container'>
        <h1 id='signup-title'>Login</h1>
        <form id='login-form' onSubmit={handleSubmit}>
          <div id="signup-error-message-container">
            {errorMessage && <p className="signup-error-message">{errorMessage}</p>}
          </div>
          <input placeholder='Enter your email address' id="email" className="form-field" type='text' value={ email } onChange={handleEmailChange} />
          <input placeholder='Enter your password' id="password" className="form-field" type='password' value={ password } onChange={handlePasswordChange} />
          <input id='submit' className='signup-submit-btn' type="submit" value="Login" />         
        </form>
          <p className='prompt-login-text'>Don't have an account?  <a href="/signup" className='prompt-login-link'>Signup</a> now</p>
      </div>
      <footer id='signup-footer-main-container'>
        <div id='signup-footer-inner-container'>
          <p id='signup-footer-team-name'>&#x1F525; TEAM FIRE, BABY! &#x1F525;</p>
          <p id='signup-footer-team-members'>Fiona | Valeria | Samuel | Callum | Chang</p>
          <p id='signup-footer-rights'>COPYRIGHT &copy; All rights reserved, obviously!</p>     
        </div>
      </footer>
    </div>
    );
}

export default LogInForm;
