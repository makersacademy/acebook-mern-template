import React, { useState } from 'react';

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
      <form onSubmit={handleSubmit}>
          <input className="email" placeholder="Email" id="email" type='text' value={ email } onChange={handleEmailChange} />
          <input className="password" placeholder="Password" id="password" type='password' value={ password } onChange={handlePasswordChange} />
        <input className="signup" id='submit' type="submit" value="Sign Up"  />
      </form>
    );
}

export default SignUpForm;
