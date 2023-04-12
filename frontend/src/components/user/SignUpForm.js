import React, { useState } from 'react';
import axios from 'axios';
// import './SignUp.css';

const SignUpForm = ({ navigate }) => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    if (!email || !password || !username) return
    

    event.preventDefault();
    
    const theBox = makingTheBox(); 
    axios.post('/users', theBox, requestHeaders)
    .then(response => {
      if(response.status === 201) {
        navigate('/login')
      } else if (response.status === 409) {
        setErrorMessage('Email address is already in use');
      } 
      else {
        navigate('/signup')
      }
    }).catch(error => console.log(error));
  }
  
  const requestHeaders = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }

  const makingTheBox = () => {
    const box = new FormData()
    box.append("email", email);
    box.append("password", password);
    box.append("profilePicture", profilePicture)
    return box
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }
  
  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleProfilePictureChange = (event) => {
    setProfilePicture(event.target.files[0])
  }

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <input placeholder="Username" id="username" type="text" value={ username } onChange={handleUsernameChange} />
          <input placeholder="Email" id="email" type='text' value={ email } onChange={handleEmailChange} />
          <input placeholder="Password" id="password" type='password' value={ password } onChange={handlePasswordChange} />
          <input id="profilePicture" type="file" accept=".png, .jpg, .jpeg" onChange={handleProfilePictureChange} />
          <input id='submit' type="submit" value="Submit" />
        </form>
        {errorMessage && <p>{errorMessage}</p>}
        Have an account already? <a href="/login">Log in</a>
      </div>
    );
}

export default SignUpForm;
