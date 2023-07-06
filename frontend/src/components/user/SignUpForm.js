import React, { useState } from 'react';
import '../../index.css'

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

  const handleUserLogin = () => {

  }


    return (
      
      // <form onSubmit={handleSubmit}>
      //     <input placeholder="Email" id="email" type='text' value={ email } onChange={handleEmailChange} />
      //     <input placeholder="Password" id="password" type='password' value={ password } onChange={handlePasswordChange} />
      //   <input id='submit' type="submit" value="Submit" />
      // </form>


      <div className="container">
      <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
      <input
        placeholder="Email"
        id="email"
        type="text"
        value={email}
        onChange={handleEmailChange}
        className="input"
      />
      <input
        placeholder="Password"
        id="password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
        className="input"
      />
      <input
        role="submit-button"
        id="submit"
        type="submit"
        value="Submit"
        className="submit-button"
      />
    </form>
    </div>
    </div>
    );
}

export default SignUpForm;
