import React, { useState } from 'react';
import NavBar from '../nav/Nav.js';
import './SignUpForm.css';

const SignUpForm = ({ navigate }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (email) {
      alert(`Thank you, ${email}, for signing up!`);
    }
    
    fetch( '/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password })
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


    return (
      <div className="centered-box">
      <h1>Sign up</h1><br></br>
      <p>Please enter a valid email and password to sign up.</p><br></br>
      <form onSubmit={handleSubmit}>
        <input placeholder='Email' id="email" type='text' value={email} onChange={event => setEmail(event.target.value)} /><br></br>
        <input className="input-field" placeholder='Password' id="password" type='password' value={password} onChange={event => setPassword(event.target.value)} /><br></br>
        <input role='submit-button' id='submit' type="submit" value="Sign-up" />
      </form>
    </div>
    );
}

export default SignUpForm;
