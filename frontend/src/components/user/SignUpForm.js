import React, { useState } from 'react';
import './SignupForm.css';
import Acebook from '../auth/static/Acebook.png';
const SignUpForm = ({ navigate }) => {

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const urlTo = (path) => {
    navigate(path);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch( '/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ displayName: displayName, email: email, password: password })
    });

    if (response.status === 201) {
      // GOOD NEWS.
      navigate('/login');
    } else {
      // BAD NEWS.
      navigate('/signup');
    }
  }

  const handleDisplayNameChange = (event) => {
    setDisplayName(event.target.value)
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }


    return (
      <div className='container'>
      <div className='split left'>
          <div className='centred'>
            <div className='left' >
                  <form onSubmit={handleSubmit}>
                  <input placeholder="Name" id="displayName" type='text' value={ displayName } onChange={handleDisplayNameChange} />
                  <input placeholder="Email" id="email" type='text' value={ email } onChange={handleEmailChange} />
                  <input placeholder="Password" id="password" type='password' value={ password } onChange={handlePasswordChange} />
                  <input className='submit' id='submit' type="submit" value="Submit" />
                  <button className='submit' data-cy="submit-button" onClick={() => urlTo('/login')}>Go to Login</button>
                  </form>
        </div></div></div>

        <div className='split right'>
            <div className='centred'>
              <div className='right' >
                <img  className='logo' src={Acebook} alt="logo" />
        </div></div></div>
    </div>
    );
}

export default SignUpForm;
