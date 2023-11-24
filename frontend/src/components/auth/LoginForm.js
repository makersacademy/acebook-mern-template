import React, { useState } from 'react';
import './LoginForm.css';
import Acebook from './static/Acebook.png';

const LogInForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const urlTo = (path) => {
    navigate(path);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch( '/tokens', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password })
    });
    if (response.status === 201) {
      // GOOD NEWS.
      // console.log("token");
      let data = await response.json();
      window.localStorage.setItem("token", data.token);
      navigate('/posts');
    } else {
      // BAD NEWS.
      navigate('/login');
    }

  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }


    return (
      <div className='container' >
        <div className='split left'>
          <div className='centred'>
            <div className='left' ><form  onSubmit={handleSubmit}>
                <input  placeholder='Email' id="email" type='text' value={ email } onChange={handleEmailChange} />
                <input placeholder='Password' id="password" type='password' value={ password } onChange={handlePasswordChange} />
                <input className='submit' role='submit-button' id='submit' type="submit" value="Login" />
                <button className='submit' data-cy="submit-button" onClick={() => urlTo('/signup')}>Sign Up</button>
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

export default LogInForm;
