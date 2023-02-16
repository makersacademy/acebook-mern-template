import React, { useState } from 'react';
const SignUpForm = ({ navigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/users`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
        display_name: displayName,
      }),
    }).then((response) => {
      if (response.status === 201) {
        navigate('/login');
      } else {
        navigate('/signup');
      }
    });
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleDisplayNameChange = (event) => {
    setDisplayName(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder='Email'
        id='email'
        type='text'
        value={email}
        onChange={handleEmailChange}
      />
      <input
        placeholder='Password'
        id='password'
        type='password'
        value={password}
        onChange={handlePasswordChange}
      />

      <input
        placeholder='Display Name'
        id='display_name'
        type='text'
        value={displayName}
        onChange={handleDisplayNameChange}
      />
      <input id='submit' type='submit' value='Submit' />
    </form>
  );
};

export default SignUpForm;
