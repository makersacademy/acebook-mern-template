import React, { useState } from 'react';
import '../../index.css'

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

  const handleForgotPassword = () => {
    //Logic needs to be added
    navigate('/forgot-password')
  }

  const handleCreateAccount = () => {
    navigate('/signup')
  }


  return (
    <div className="container">
      <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
      <input
        placeholder="Email"
        id="email"
        type="text"
        value={email}
        onChange={handleEmailChange}
        className="input"
      />
      <input
        placeholder="Password"
        id="password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
        className="input"
      />
      <input
        role="submit-button"
        id="submit"
        type="submit"
        value="Submit"
        className="submit-button"
      />
    </form>
    <button className="forgot-password-button" onClick={handleForgotPassword}>
          Forgot Password?
    </button>
      <button className="sign-up-button" onClick={handleCreateAccount}>
          Not a user? Sign up here
      </button>
    </div>
    </div>
  );
};

export default LogInForm;
