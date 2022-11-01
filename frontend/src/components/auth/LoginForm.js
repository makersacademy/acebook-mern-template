import React, { useState } from 'react';
import "./Login.css";

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
      <form onSubmit={handleSubmit}>
        <p>Welcome to Acebook</p>
        <input placeholder='Email' id="email" type='text' value={ email } onChange={handleEmailChange} />
        <br />
        <input placeholder='Password' id="password" type='password' value={ password } onChange={handlePasswordChange} />
        <br />
        <input role='submit-button' id='submit' type="submit" value="Submit" />
        <div class="footer">
         <p>Ⓒ The Incredibles</p>
      </div>
      </form>
    );
}

export default LogInForm;
