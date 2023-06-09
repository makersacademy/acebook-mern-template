import React, { useState } from 'react';
import Navbar from '../navbar/Navbar';

const SignUpForm = ({ navigate }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");



  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch( '/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        userName: userName,
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

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }
  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value)
  }
  const handleLastNameChange = (event) => {
    setLastName(event.target.value)
  }
  const handleUserNameChange = (event) => {
    setUserName(event.target.value)
  }


    return (
      <>
      <Navbar />
      <form onSubmit={handleSubmit}>
          <input placeholder="Email" id="email" type='text' value={ email } onChange={handleEmailChange} />
          <input placeholder="Password" id="password" type='password' value={ password } onChange={handlePasswordChange} />
          <input placeholder="First Name" id="firstName" type='text' value={ firstName } onChange={handleFirstNameChange} />
          <input placeholder="Last Name" id="lastName" type='text' value={ lastName } onChange={handleLastNameChange} />
          <input placeholder="User Name" id="userName" type='text' value={ userName } onChange={handleUserNameChange} />
        <input id='submit' type="submit" value="Submit" />
      </form>
      </>
    );
}

export default SignUpForm;
