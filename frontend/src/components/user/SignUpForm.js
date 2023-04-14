import React, { useState } from 'react';
import Navbar from '../nav/nav';

const SignUpForm = ({ navigate }) => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [file, setFile] = useState('f6782410420a17e3de48d22412adfd0c.jpg'); 

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch( '/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        username: username, 
        email: email, 
        password: password,
        profilePicture: file
       })
    })
      .then(response => {
        if(response.status === 201) {
          navigate('/login')
        } else {
          navigate('/signup')
        }
      })
  }

  const handleUsernameChange = (event ) => {
    setUsername(event.target.value)
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleImageChange = (event) => {
    setFile(event.target.files[0]);
  }

  const handleImageUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('profilePicture', file)
    

    try {
      const response = await fetch('users/upload-image', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      console.log(data.filename + '.jpg');
      setFile(data.filename)

    } catch (error) {
      console.log(error);
    }


  }

  const renderImageUploadForm = () => {
    return (
      <>
        <h3>Upload a profile image:</h3>
        <form onSubmit={handleImageUpload} encType="multipart/form-data">
          <input type="file" name="image" onChange={handleImageChange}/>
          <input type="submit" name="upload"/>
        </form>
      </>
    )
  }

    return (
      <>
      <Navbar/>
      <h2>Sign Up</h2>
      <p>Password: 8 characters minimum</p>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input placeholder="username" id="username" type="text" value={username} onChange={handleUsernameChange}></input>
          <input placeholder="Email" id="email" type='text' pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" value={ email } onChange={handleEmailChange} />
          <input placeholder="Password" id="password" type='password' pattern="[a-zA-Z0-9.-_!?]{8,20}" value={ password } onChange={handlePasswordChange} />
        <input id='submit' type="submit" value="Create account" />
      </form>

      {renderImageUploadForm()}
      </>
    );
}

export default SignUpForm;
