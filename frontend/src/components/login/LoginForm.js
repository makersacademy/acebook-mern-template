import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import '../login/loginForm.css'

const LoginForm = ({ navigate, setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const { handleUserInfo } = useContext(UserContext)

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch('/tokens', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password })
    })

    if (response.status !== 201) {
      console.log(response.status);
      setErrorMessage(true);
      console.log("failed")
      navigate('/login')
    } else {
      console.log("logged in")
      console.log(response.status);
      const data = await response.json()
      window.localStorage.setItem("token", data.token)
      window.localStorage.setItem("userInfo", data)
      console.log(window.localStorage.getItem("userInfo"))
      setToken(data.token)

      handleUserInfo({
        _id: data._id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email
      })

      navigate('/');
    }
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  return (
    <form onSubmit={handleSubmit} className="loginContainer">
      <div id='formLabel' className="form-label">Log in to Acebook</div>
      <div className="mb-3">
        <input placeholder='Email' name="email" id="email" type='text' value={email} onChange={handleEmailChange} className="form-control" />
      </div>
      <div className="mb-3">
        <input placeholder='Password' id="password" name="password" type='password' value={password} onChange={handlePasswordChange} className="form-control" />
      </div>
      <input role='submit-button' id='submit' type="submit" value="Login" className="loginButton" />
      {errorMessage ?
        <div className="alert alert-danger" role="alert">
          Invalid username or Password
        </div> : null
      }
      <a className="linkForgottenPassword" href="">Forgotten password?</a>
      <div className="lineBreak"></div>
      <button type="button" className="buttonSignUp" href="/signup/">Sign Up</button>
    </form>
  );
}

export default LoginForm;
