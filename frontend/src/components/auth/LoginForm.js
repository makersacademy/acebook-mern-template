import React, { useState } from 'react';
import './Login.css';
import Card from './../Helpers/Card'
import CardInput from './../Helpers/CardInput'
import '../../index.css';

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
      console.log('yay');
      navigate('/login');
    } else {
      console.log('oop');
      let data = await response.json();
      console.log(data);
      window.localStorage.setItem('token', data.token);
      window.localStorage.setItem('user_id', data.user_id);
      console.log(window.localStorage.getItem('user_id'));
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
    <div className='login'>
      <div className='login-left'>
      <h1>
        Acebook
      </h1>
  
      <h3>
        Acebook helps you connect and share with people in your life
      </h3>
    </div>

    <div className="login-right">
    <Card>
    <form className="login-form" onSubmit={handleSubmit}>
 
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
        
     
      <div className='submit-login'>
        <input role="submit-button" id="submit" type="submit" value="Log in" />
        <h5>Forgotten password?</h5>
        <hr></hr>
      </div>
      <div>
      
      </div>
      <div>
      <button id="create-account">Create a new account</button>
      </div>
    </form>
    </Card>
    </div>
    </div>
  );
};

export default LogInForm;
