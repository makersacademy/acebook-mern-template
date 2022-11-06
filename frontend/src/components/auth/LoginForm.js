import React, { useState } from 'react';
import errorHandlerEmail from '../errorHandling/errorHandlerEmail';
import errorHandlerPassword from '../errorHandling/errorHandlerPassword';
import errorHandlerUsersName from '../errorHandling/errorHandlerUsersName';

const LogInForm = ({ navigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationErrors, setError] = useState('');

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
      console.log('yay');
      navigate('/login');
    } else {
      console.log('oop');
      let data = await response.json();
      window.localStorage.setItem('token', data.token);
      navigate('/posts');
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setError(errorHandlerEmail(email));
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <h1>Log-in</h1>
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
        <input role="submit-button" id="submit" type="submit" value="Submit" />
      </form>
      <div id="ErrorMessageEmail" value={validationErrors}>
        {errorHandlerEmail(email)}
      </div>

      <div id="ErrorMessagePassword" value={validationErrors}>
        {errorHandlerPassword(password)}
      </div>
    </>
  );
};

export default LogInForm;
