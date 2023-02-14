import React, { useState } from 'react';
import './signUpForm.css';
import logo from '../../resources/Acebook-logos/Acebook-logos.jpeg';

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
        <img alt='middleLogo' className='middleLogo' src={ logo }/>
        <h2 id='sign-up-title'>Sign up now!</h2>
        <div className="container">
          <form className='signUpLoginForm' onSubmit={handleSubmit}>
            <div className="input-box">
              <input className='form_field' id="email" type='text' value={ email } onChange={handleEmailChange} />
              <label id='form_label' for='email'>Email</label >
              <i></i>
              
            </div>
            <div className="input-box">
              <input className='form_field' id="password" type='password' value={ password } onChange={handlePasswordChange} />
              <label id='form_label' for='password'>Password</label>
              <i></i>
            </div> 
            <input id='submit' type="submit" value="Sign Up" />
          </form>
          </div>
      </main>
    );
}

export default SignUpForm;

/*<div class="container">
  <div class="form">
    <div class="input-box">
      <input type="text" required>
      <span>Username</span>
      <i></i>
    </div>
    <div class="input-box">
      <input type="text" required>
      <span>Password</span>
      <i></i>
    </div>
  </div>
</div>*/