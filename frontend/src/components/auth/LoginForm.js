import React, { useState } from 'react';
import './LoginForm.css'
import M from 'materialize-css'

const LogInForm = ({navigate}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    let status = null
    let response = await fetch( '/tokens', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password })
    })    
    .then(res => {
      status = res.status
      return res.json()
    })
    .then(data => {
      if (status !== 201) {
        M.toast({html: data.message, classes: "rounded"})
      } else {
        M.toast({html: data.message, classes: "rounded"})
        window.localStorage.setItem("token", data.token)
        window.localStorage.setItem("user", JSON.stringify(data.user))
        navigate('/posts')
      }
    })
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

    return (
      <div id="li-page">
      <div className="li-wrap"> 
            <div className="heading">
              <img src="https://i.imgur.com/kjtUiie.png" className="home-img" alt="Acebook"></img>
            </div>
            <p className="li-text">Log-in with your email & password!</p>
        </div>
        <div className="li-form-div">
          <div className='back-btn'>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid, no-script-url, jsx-a11y/alt-text */}
          <a href="javascript:window.history.back();"><img className="back-img" src="https://imgur.com/rHa4WHk.png"></img></a>
          </div>
          <form onSubmit={handleSubmit} className="li-form">
            <input placeholder='Email' id="email" className='email-and-password ' type='text' value={ email } onChange={handleEmailChange} />
            <br></br>
            <br></br>
            <input placeholder='Password' id="password" className='email-and-password ' type='password' value={ password } onChange={handlePasswordChange} />
            <br></br>
            <br></br>
            <button id="signup" type='text' className='login-button' onClick={handleSubmit}>Log In</button>
          </form>
        </div>
      </div>
    );
}

export default LogInForm;
