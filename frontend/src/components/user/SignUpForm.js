import React, { useState } from 'react';

const SignUpForm = ({ navigate }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [errors, setErrors] = useState([]);
  window.localStorage.setItem("app-route", "signup")

  const handleSubmit = async (event) => {
    event.preventDefault();

    //need to change this to use fetch with the avatar
    //image do not uppload with JSon. 
    const formData = new FormData();
    formData.append('email', email);
    formData.append('username', username);
    formData.append('password', password);
    if (avatar) {
      formData.append('avatar', avatar);
    }

    fetch('/users', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (response.status === 201) {
          navigate('/login');
        } else {
          if (response.status === 400) {
            response.json().then((data) => {
              setErrors(data.message);
            });
          }
          navigate('/signup');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleAvatarChange = (event) => {
    //before was a string, now is a fileq
    setAvatar(event.target.files[0]);
  };

  const login = () => {
    navigate('/login');
  };

  return (
    <div className='login-form'>
      <div className='title-container'>
        <h1 className='login-title'>Farcebook Sign Up</h1>
      </div>
      <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email: </label>
          <input placeholder="Email" id="email" type='text' value={ email } onChange={handleEmailChange} /> <br />
          <label htmlFor="username">Username: </label>
          <input placeholder="Username" id="username" type='text' value={ username } onChange={handleUsernameChange} /> <br />
          <label htmlFor="password">Password: </label>
          <input placeholder="Password" id="password" type='password' value={ password } onChange={handlePasswordChange} /> <br />
          <input placeholder="Avatar" id="avatar" type='avatar' value={ avatar } onChange={handleAvatarChange} />
        <input id='submit' type="submit" value="Submit" />
      </form>

      <div>{errors}</div>
    </div>
  );
};

export default SignUpForm;
