import React, { useState } from 'react';
import './LoginForm.css'

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
      console.log("oop")
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
            <input placeholder='Email' id="email" class='textEntry' type='text' value={ email } onChange={handleEmailChange} />
            <input placeholder='Password' id="password" class='textEntry' type='password' value={ password } onChange={handlePasswordChange} />
            <input id='submit' type="submit" class="loginButton" value="Log In" />
          </form>
        </div>
      </div>
      </body>
    );
}

export default LogInForm;
