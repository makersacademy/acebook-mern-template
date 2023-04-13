import React, { useState } from 'react';
import axios from 'axios';
import './SignUp.css';

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
        if (response.status === 201) { navigate('/login') }
        else if (response.status === 409) { 
          setErrorMessage('Email address already exits');
          // this else if can be removed because if 409, 
          //the catch error is run instead so this will never run
        }
        else { navigate('/signup') }
      })
      .catch((err) => setErrorMessage(err.response.data.message));
  }
  
  const requestHeaders = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }

  const makingTheBox = () => {
    const box = new FormData()
    box.append('username', username)
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
    <div id='signup-god-container'>
      <div id='signup-navbar-container'>
        <nav id="signup-navbar">
          <h1>ACEBOOK</h1>
        </nav>
      </div>
      <div id='signup-container'>
          <h1 id='signup-title'>Signup</h1>
        <form id='signup-form' onSubmit={handleSubmit}>
          
          <div id="signup-error-message-container">
            {errorMessage && <p className="signup-error-message">{errorMessage}</p>}
          </div>
          <input placeholder="Username" id="username" className="form-field" type="text" value={ username } onChange={handleUsernameChange} />
          <input placeholder="Email" id="email" className="form-field"type='text' value={ email } onChange={handleEmailChange} />
          <input placeholder="Password" id="password" className="form-field" type='password' value={password} onChange={handlePasswordChange} />

          <p id='upload-photo-text'>Upload a profile picture</p>
          <div id="signup-profile-pic-upload-container">
            <div id="signup-profile-pic-upload-icon">
              <input id="profilePicture" className="form-field" type="file" accept=".png, .jpg, .jpeg" onChange={handleProfilePictureChange} />
              <i className="fa-regular fa-image fa-3x"></i>
            </div>
            <div>
              {<p className='signup-photo-filename'>{profilePicture ? profilePicture.name : "No file chosen"}</p> }
            </div>
          </div>
          
          <input id='submit' className='signup-submit-btn' type="submit" value="Submit" />
          
        </form>
          <p className='prompt-login-text'>Already have an account? Please <a href="/login" className='prompt-login-link'>login</a></p>
      </div>
      <footer id='signup-footer-main-container'>
        <div id='signup-footer-inner-container'>
          <p id='signup-footer-team-name'>&#x1F525; TEAM FIRE, BABY! &#x1F525;</p>
          <p id='signup-footer-team-members'>Fiona | Valeria | Samuel | Callum | Chang</p>
          <p id='signup-footer-rights'>COPYRIGHT &copy; All rights reserved, obviously!</p>     
        </div>
      </footer>
    </div>
    );
}

export default SignUpForm;
