import React, { useState } from 'react';

const SignUpForm = ({ navigate }) => {

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]); //  'Invalid email address!'

  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch( '/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, username: username, password: password })
    })
      .then(response => {
        if(response.status === 201) {
          navigate('/login')
        } else {
          if(response.status === 400) {
            response.json().then(data => {
              setErrors(data.message) //message comes from backend
            })
          }

          navigate('/signup')
        }
      })
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const login = () => {
    navigate('/login')
  }


  return (
    <>
      <h2>Sign up</h2>
      <button onClick={login}>
              Login 
      </button>
      <form onSubmit={handleSubmit}>
          <input placeholder="Email" id="email" type='text' value={ email } onChange={handleEmailChange} />
          <input placeholder="Username" id="username" type='text' value={ username } onChange={handleUsernameChange} />
          <input placeholder="Password" id="password" type='password' value={ password } onChange={handlePasswordChange} />
        <input id='submit' type="submit" value="Submit" />
      </form>
      <div>
        {errors}
      </div>
      </>
    );
}

export default SignUpForm;
