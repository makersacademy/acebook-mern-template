import React, { useState } from 'react';

const LogInForm = ({ navigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch('/tokens', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password }),
    });

    if (response.status !== 201) {
      console.log('oops');
      navigate('/login');
    } else {
      console.log('yay');

      let data = await response.json();
      console.log(data.user_id);
      window.localStorage.setItem('token', data.token);
      window.localStorage.setItem('user_id', data.user_id);
      navigate('/posts');
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
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
      <input role='submit-button' id='submit' type='submit' value='Submit' />
    </form>
  );
};

export default LogInForm;
