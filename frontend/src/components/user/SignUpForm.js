import React, { useState } from 'react';

const SignUpForm = ({ navigate }) => {
  // POST request with username, email and password, (empty avatar is added by default)
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
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
          // redirect to avatar choice page while passing history from this page (user email)
          navigate('/choose-avatar', { state: { userEmail: email } });
        } else {
          navigate('/signup')
        }
      })
  }

  // input change handlers
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

// render of html object
    return (
      <form onSubmit={handleSubmit}>
          <input placeholder="Username" id="username" type='text' value={ username } onChange={handleUsernameChange} />
          <input placeholder="Email" id="email" type='text' value={ email } onChange={handleEmailChange} />
          <input placeholder="Password" id="password" type='password' value={ password } onChange={handlePasswordChange} />
        <input id='submit' type="submit" value="Submit" />
      </form>
    );
}

export default SignUpForm;
