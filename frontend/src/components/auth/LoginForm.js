import React, { useState } from 'react';
import SignUpForm from '../user/SignUpForm'

const LogInForm = ({ navigate }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch('/tokens', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, password: password })
    })

    if (response.status !== 201) {
      console.log("yay")
      navigate('/login')
    } else {
      console.log("oop")
      let data = await response.json()
      window.localStorage.setItem("token", data.token)
      window.localStorage.setItem("username", username)
      navigate('/posts');
    }
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }


  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
      <label for="username">Username: </label>
        <input placeholder="Username" id="username" type='text' value={ username } onChange={handleUsernameChange} /> <br />
        <label for="password">Password: </label>
        <input placeholder='Password' id="password" type='password' value={password} onChange={handlePasswordChange} /> <br />
        <input role='submit-button' id='submit' type="submit" value="Submit" />
      </form>
    
    </>
  )
}

export default LogInForm;
