import React, { useState } from 'react';
import './LoginForm.css'

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
      window.localStorage.setItem("user_id", data.user_id)
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
      <div id="li-page">
      <div className="li-wrap">
            <div className="heading">
              <img src="https://i.imgur.com/kjtUiie.png" className="home-img" alt="Acebook"></img>
            </div>
            <p className="li-text">Log-in with your email & password!</p>
        </div>
        <div className="li-form-div">
          <form onSubmit={handleSubmit} className="li-form">
            <input placeholder='Email' id="email" className='email-and-password ' type='text' value={ email } onChange={handleEmailChange} />
            <input placeholder='Password' id="password" className='email-and-password ' type='password' value={ password } onChange={handlePasswordChange} />
            <input id='submit' type="submit" className="loginButton" value="Log In" />
          </form>
        </div>
      </div>
    );
}

export default LogInForm;
