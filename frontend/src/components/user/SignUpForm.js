import React, { useState } from 'react';
// import './SignUp.css';

const SignUpForm = ({ navigate }) => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    if (!email || !password || !username) return
    
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
        } else if (response.status === 409) {
          setErrorMessage('Email address is already in use');
        } 
        else {
          navigate('/signup')
        }
      })
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }
  
  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }


    return (
      <div>
        <form onSubmit={handleSubmit}>
          <input placeholder="Username" id="username" type="text" value={ username } onChange={handleUsernameChange} />
          <input placeholder="Email" id="email" type='text' value={ email } onChange={handleEmailChange} />
          <input placeholder="Password" id="password" type='password' value={ password } onChange={handlePasswordChange} />
          <input id='submit' type="submit" value="Submit" />
        </form>
        {errorMessage && <p>{errorMessage}</p>}
        Have an account already? <a href="/login">Log in</a>
      </div>
    );
}

export default SignUpForm;
