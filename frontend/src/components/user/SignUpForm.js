import React, { useState } from 'react';
import './SignUpForm.css'

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
      <body>
      <div id="homePage">
        <div class="textWrap">
          <div class="heading">
            <img src="https://i.imgur.com/kjtUiie.png" class="home-img" alt="Acebook"></img>
          </div>
            <p class="catchline">The worst Facebook clone there ever was...</p>
          </div>
          <div class="formWrap">
            <form onSubmit={handleSubmit}>
              <input placeholder="Email" id="email" class='textEntry' type='text' value={ email } onChange={handleEmailChange} />
              <input placeholder="Password" id="password" class='textEntry' type='password' value={ password } onChange={handlePasswordChange} />
              <input id='submit' type="submit" class="signupButton" value="Sign Up" />
            </form>
          </div>
        </div>
      </body>
    );
}

export default SignUpForm;
