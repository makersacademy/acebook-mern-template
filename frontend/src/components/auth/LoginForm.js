import React, { useState } from 'react';
import Navbar from '../nav/nav';

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
      window.localStorage.setItem("username", data.username)
      window.localStorage.setItem("profilePicture", data.profilePicture)
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
      <Navbar/>
      <h2>Log in</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder='Email' id="email" type='text' pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" value={ email } onChange={handleEmailChange} />
        <input placeholder='Password' id="password" type='password'  value={ password } onChange={handlePasswordChange} />
        <input role='submit-button' id='submit' type="submit" value="Log in!" />
      </form>
      </>
    );
}

export default LogInForm;
