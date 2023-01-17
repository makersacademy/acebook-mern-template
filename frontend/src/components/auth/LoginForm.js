import React, { useState } from 'react';
import './Login.css';
import Card from './../Helpers/Card'
import CardInput from './../Helpers/CardInput'

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
    <Card>
      <h1>
        Acebook
      </h1>
    </Card>
    <Card>
      <h3>
        Acebook helps you connect and share with people in your life
      </h3>
    </Card>
    </div>

    <div className="login-right">
    <Card>
    <form className="login" onSubmit={handleSubmit}>
      <CardInput>
      <input
        placeholder="Email"
        id="email"
        type="text"
        value={email}
        onChange={handleEmailChange}
      />
      </CardInput>
      <CardInput>
        <input
          placeholder="Password"
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        
      </CardInput>
      <div>
        <input role="submit-button" id="submit" type="submit" value="Log in" />
        
      </div>
      <div>
      <button>Create a new account</button>
      </div>
    </form>
    </Card>
    </div>
    </div>
  );
};

export default LogInForm;
