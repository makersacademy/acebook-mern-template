import React, { useState } from 'react';
import './SignUpForm.css'

const SignUpForm = ({ navigate }) => {
  const [username, setUsername] = useState("")
  const [firstName, setFirst] = useState("")
  const [lastName, setLast] = useState("")
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

  return (
    <div id="su-page">
      <div className="su-wrap">
        <div className="heading">
          <img src="https://i.imgur.com/kjtUiie.png" className="home-img" alt="Acebook"></img>
        </div>
          <p className="su-text">Please enter your details to sign up!</p>
        </div>
        <div className="su-form-div">
          <form onSubmit={handleSubmit} className="su-form">
            <input placeholder="Username" id="username" className='text-entry' type='text' value={ username } onChange={(e) => setUsername(e.target.value)} />
            <div className="first-name"><input placeholder="First Name" id="firstName" className='first-name-txt' type='text' value={ firstName } onChange={(e) => setFirst(e.target.value)} /></div>
            <div className="last-name"><input placeholder="Last Name" id="lastName" className='last-name-txt' type='text' value={ lastName } onChange={(e) => setLast(e.target.value)} /></div>
            <input placeholder="Email" id="email" className='text-entry' type='text' value={ email } onChange={(e) => setEmail(e.target.value)} />
            <input placeholder="Password" id="password" className='text-entry' type='password' value={ password } onChange={(e) => setPassword(e.target.value)} />
            <input id='submit' type="submit" className="signupButton" value="Sign Up" />
          </form>
        </div>
      </div>
  );
}

export default SignUpForm;
