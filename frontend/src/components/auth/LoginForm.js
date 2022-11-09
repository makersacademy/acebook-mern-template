import React, { useState } from 'react';
import "./Login.css";
import Footer from '../footer/footer';

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
      console.log("Login failed")
      navigate('/')
      document.querySelector(".loginErrorMessage").style.display = 'block'
    } else {
      console.log("Login success")
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
      <div className="home-login-box">
        <form onSubmit={handleSubmit} action="#">
          <div className="loginErrorMessage">User details are incorrect.</div>
          <input placeholder='Email address' type='text' value={ email } onChange={handleEmailChange} />
          <input placeholder='Password' type='password' value={ password } onChange={handlePasswordChange} />
          <button type="submit">Log In</button>
        </form>
        <hr/>
        <div className="create-acc-btn">
          New to Spybook? <a href="/signup" >Sign Up</a>
        </div>
        <Footer/>        
      </div>
        
    
    );
}

export default LogInForm;