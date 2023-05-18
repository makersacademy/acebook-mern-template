import React, { useState } from 'react';

const SignUpForm = ({ navigate }) => {
 
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const[avatar, setAvatar] = useState(""); // [null, function
  const [errors, setErrors] = useState([]); //  'Invalid email address!'
  window.localStorage.setItem("app-route", "signup")

  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch( '/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, username: username, password: password, avatar: avatar})
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

  const handleAvatarChange = (event) => {
    setAvatar(event.target.value)
  }

  const login = () => {
    navigate('/login')
  }


  return (
    <div className='login-form'>
      <form onSubmit={handleSubmit}>
          <label for="email">Email: </label>
          <input placeholder="Email" id="email" type='text' value={ email } onChange={handleEmailChange} /> <br />
          <label for="username">Username: </label>
          <input placeholder="Username" id="username" type='text' value={ username } onChange={handleUsernameChange} /> <br />
          <label for="password">Password: </label>
          <input placeholder="Password" id="password" type='password' value={ password } onChange={handlePasswordChange} /> <br />
          <input placeholder="Avatar" id="avatar" type='avatar' value={ avatar } onChange={handleAvatarChange} />
        <input id='submit' type="submit" value="Submit" />
      </form>
      <div>
        {errors}
      </div>
      </div>
    );
}

export default SignUpForm;
