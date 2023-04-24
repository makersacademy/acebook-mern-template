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
      window.localStorage.setItem("user_id", data.user_id)
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
      <div id="homePage">
      <div className="textWrap">
            <div className="heading">
              <img src="https://i.imgur.com/kjtUiie.png" className="home-img" alt="Acebook"></img>
            </div>
            <p className="catchline">The worst Facebook clone there ever was...</p>
        </div>
        <div className="formWrap">
          <form onSubmit={handleSubmit}>
            <input placeholder='Email' id="email" className='textEntry' type='text' value={ email } onChange={handleEmailChange} />
            <input placeholder='Password' id="password" className='textEntry' type='password' value={ password } onChange={handlePasswordChange} />
            <input id='submit' type="submit" className="loginButton" value="Log In" />
          </form>
        </div>
      </div>
    );
}

export default LogInForm;
