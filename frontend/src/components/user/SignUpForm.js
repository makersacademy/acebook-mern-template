import React, { useState } from 'react';
import './SignUpForm.css';
import { Link } from 'react-router-dom';


const SignUpForm = ({ navigate }) => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch( '/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name, email: email, password: password })
    })
      .then(response => {
        if(response.status === 201) {
          navigate('/login')
        } else {
          navigate('/')
        }
      })
  }

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }


    return (
      <>
      <div id="signup">
        <h1>Sign Up For Acebook Now!</h1>
      <form onSubmit={handleSubmit}>
          <input placeholder="Name" id="name" type='text' value={ name } onChange={handleNameChange} />
          <input placeholder="Email" id="email" type='text' value={ email } onChange={handleEmailChange} />
          <input placeholder="Password" id="password" type='password' value={ password } onChange={handlePasswordChange} />
        <button id='submit' type="submit" value="Submit">SIGN UP NOW!</button>
      </form>
      <p>Already have an account?</p>
      <p>LOG IN <Link to="/login" className="login-link">HERE</Link>!</p>
      </div> 
      </>
    );
}

export default SignUpForm;
