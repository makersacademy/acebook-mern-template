import React, { useState } from 'react';
import Navbar from '../nav/nav';

const SignUpForm = ({ navigate }) => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch( '/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, email: email, password: password })
    })
      .then(response => {
        if(response.status === 201) {
          navigate('/login')
        } else {
          navigate('/signup')
        }
      })
  }

  const handleUsernameChange = (event ) => {
    setUsername(event.target.value)
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleImageUpload = () => {
    console.log("image uploaded!")
  }


    return (
      <>
      <Navbar/>
      <h2>Sign Up</h2>
      <p>Password: 8 characters minimum</p>
      <form onSubmit={handleSubmit}>
          <input placeholder="username" id="username" type="text" value={username} onChange={handleUsernameChange}></input>
          <input placeholder="Email" id="email" type='text' pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" value={ email } onChange={handleEmailChange} />
          <input placeholder="Password" id="password" type='password' pattern="[a-zA-Z0-9.-_!?]{8,20}" value={ password } onChange={handlePasswordChange} />
          <div>Upload your profile photo:</div>
          <input placeholder="image" id="image" type="file" onChange={handlePasswordChange}/>
        <input id='submit' type="submit" value="Create account" />
      </form>
      </>
    );
}

export default SignUpForm;
