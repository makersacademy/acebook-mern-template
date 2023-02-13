import React, { useState } from 'react';
import './signUpForm.css';

const SignUpForm = ({ navigate }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

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
      <main>
        <img alt='middleLogo' className='middleLogo' />
        <h2>Sign up now!</h2>
        <form className='signUpLoginForm' onSubmit={handleSubmit}>
            <input placeholder="Email" className='email' id="email" type='text' value={ email } onChange={handleEmailChange} />
            <input placeholder="Password" className='password' id="password" type='password' value={ password } onChange={handlePasswordChange} />
            <input id='submit' type="submit" value="Sign Up" />
        </form>
      </main>
    );
}

export default SignUpForm;
