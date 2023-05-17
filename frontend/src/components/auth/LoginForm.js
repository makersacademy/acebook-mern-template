import React, { useState } from 'react';
import './LoginForm.css';

const LogInForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch( '/tokens', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password })
    })

    if(response.status !== 201) {
      console.log("yay")
      navigate('/login')
    } else {
      console.log("oops")
      let data = await response.json()
      window.localStorage.setItem("token", data.token)
      navigate('/posts');
    }
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }


  return (
    <div className='login-container'>
      <form className='login-form' onSubmit={handleSubmit}>
        <div className='form-input'>
          <input placeholder='Email' id="email" type='text' value={ email } onChange={handleEmailChange} />
        </div>
        <div className='form-input'>
          <input placeholder='Password' id="password" type='password' value={ password } onChange={handlePasswordChange} />
        </div>
        <div className='login-button-container'>
          <input className='login-button' role='submit-button' id='submit' type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );  
}

export default LogInForm;
