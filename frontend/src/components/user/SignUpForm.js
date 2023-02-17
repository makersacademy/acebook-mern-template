import React, { useState } from 'react';
import './signUpForm.css';
import logo from '../../resources/Acebook-logos/Acebook-logos.jpeg';

const SignUpForm = ({ navigate }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('/users', {
      method: 'POST',
      body: JSON.stringify({email: email, password: password}),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const json = await response.json()

    if (!response.ok) {
      setError(json.message)
    }

    if (response.ok) {
      { navigate('/login')}
      setError(null)
      console.log('Request Submitted')
    }
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
          {error && <div className="error">{error}</div>}
          </div>
      </main>
    );
}

export default SignUpForm;
