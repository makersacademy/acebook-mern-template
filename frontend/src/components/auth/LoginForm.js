import React, { useState } from 'react';

const LogInForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

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
      setError("Incorrect login details, try again....");
      return
    } else {
      let data = await response.json()
      window.localStorage.setItem("token", data.token)
      window.localStorage.setItem("email", email)
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
    <div className="logInForm">

    <nav className="nav">
      
        <a href="/posts" className="site-title">
            acebook
        </a>
        <ul>
                <a class="signup-button" href="/signup"> Signup </a>
        </ul>
   </nav>
 

      
      <div class='bold-line'></div>
<div class='container'>
  <div class='window'>
    <div class='overlay'></div>
    <div class='content'>
      <div id='welcome-login'>Hello there!</div>
      <div id='subb-login'>Welcome to acebook!</div>
      <div id='subtitle-login'>Login below</div>
      <form onSubmit={handleSubmit}>
      <div class='input-fields'>
        <input type='email' placeholder='Email' class='input-line full-width' value={ email } onChange={handleEmailChange} ></input>
        <input type='password' placeholder='Password' class='input-line full-width' value={ password } onChange={handlePasswordChange} ></input>
      </div>
      <div class="login-button"><button class='ghost-round full-width' id='submit' value="Submit">Login</button></div>
      </form>
    </div>
  </div>
</div>
    </div>
    );
}

export default LogInForm;
