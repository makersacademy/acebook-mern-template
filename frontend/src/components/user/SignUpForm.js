import React, { useState } from 'react';
import NavigationBar from '../navigation/Navigation';

const SignUpForm = ({ navigate }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch( '/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password, username: username })
    })
      .then(response => {
        if(response.status === 201) {
          navigate('/login')
        } else {
          navigate('/signup')
        }
      })
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }  
  const handleLoginClick = () => {
    navigate("/login");
  }

    return (
      <>
        <NavigationBar />
        <h3>Create a new account</h3>
        <p>It's quick and easy.</p>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Email"
            id="email"
            type="text"
            value={email}
            onChange={handleEmailChange}
          />
          <input
            placeholder="Password"
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <input
            placeholder="Username"
            id="username"
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
          <input id="submit" type="submit" value="Submit" />
        </form>
        <p>Already a registered user?</p>
        <button type="button" id="button" onClick={handleLoginClick}>
          Log in
        </button>

      </>
    );
}

export default SignUpForm;
