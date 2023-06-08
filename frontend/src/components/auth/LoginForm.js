import React, { useState } from 'react';

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
      console.log("unsuccessful login")
      navigate('/login')
    } else {
      console.log("successful login")
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
      <>
      <h1> Log in </h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email: </label> 
          <input placeholder='Email' id="email" type='email' value={ email } onChange={handleEmailChange} />
          <p></p>
          <label htmlFor="email">Password: </label> 
          <input placeholder='Password' id="password" type='password' value={ password } onChange={handlePasswordChange} />
          <input id='submit' type="submit" value="Submit" />
        </form>
      </>
    );
}

export default LogInForm;
