import React, { useState } from 'react';

const SignUpForm = ({ navigate }) => {

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch( '/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, username: username, password: password })
    })
      .then(response => {
        if(response.status === 201) {
          navigate('/login')
        } else {
          setErrorMessage('Invalid user!');
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

  const signin = () => {
    navigate('/login')
  }


    return (
      <div class='signin'>
      <form onSubmit={handleSubmit}>
          <input placeholder="Email" id="email" type='text' value={ email } onChange={handleEmailChange} />
          <br></br>
          <br></br>
          <input placeholder="Username" id="username" type='text' value={ username } onChange={handleUsernameChange} />
          <br></br>
          <br></br>
          <input placeholder="Password" id="password" type='password' value={ password } onChange={handlePasswordChange} />
          <br></br>
          <br></br>
        <input id='submit' type="submit" value="Sign up!" />
        {errorMessage && (
          <p className="error"> {errorMessage} </p>
          )}
      </form>
      <br></br>
      <button onClick={signin}>
        Already registered? Log in!
      </button>
      </div>
    );
}

export default SignUpForm;
