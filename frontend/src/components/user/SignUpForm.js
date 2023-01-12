import React, { useState } from 'react';
import './SignUp.css';

const SignUpForm = ({ navigate }) => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    let response = await fetch( '/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name, email: email, password: password })
    });
     
      let data = await response.json()

      if(response.status === 201) {
        navigate('/login')
      } else {
        setError(data.message)
        navigate('/signup');
      }
  }

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }


    return (
      <form onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          <input placeholder="Name" id="name" type='text' value={ name } onChange={handleNameChange} />
          <input placeholder="Email" id="email" type='email' value={ email } onChange={handleEmailChange} />
          <input placeholder="Password" id="password" type='password' value={ password } onChange={handlePasswordChange} />
        <input id='submit' type="submit" value="Submit" />
        {error && <div className="error">{error}</div>}
      </form>
    );
}

export default SignUpForm;
