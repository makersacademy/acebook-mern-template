import React, { useState } from 'react';

const LogInForm = ({ navigate, setToken }) => {
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
      console.log(response.status);
      console.log("failed")
      navigate('/login')
    } else {
      console.log("logged in")
      console.log(response.status);
      let data = await response.json()
      window.localStorage.setItem("token", data.token)
      setToken(data.token)
      navigate('/');
    }
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }


    return (
      <form onSubmit={handleSubmit} className="container">
        <div className ="mb-3">
          <label for="email" className="form-label">Email address</label>
          <input placeholder='Email' id="email" type='text' value={ email } onChange={handleEmailChange} className="form-control"/>
        </div>
        <div className ="mb-3">
          <label for="password" className="form-label">Password</label>
          <input placeholder='Password' id="password" type='password' value={ password } onChange={handlePasswordChange} className="form-control" />
        </div>
          <input role='submit-button' id='submit' type="submit" value="Submit" className="btn btn-primary"/>
      </form>
    );
}

export default LogInForm;
