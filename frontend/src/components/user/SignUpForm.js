import React, { useState } from 'react';


const SignUpForm = ({ navigate }) => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [emptyFieldsError, setEmptyFieldsError] = useState("");
  


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!firstName || !lastName || !email || !password || !retypePassword) {
      setErrorMessage("All fields must be filled"); 
      return;
    } else {
      setEmptyFieldsError("");
    } 


    fetch( 'api/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName, email, password, retypePassword })
    })
      .then(response => {
        if(response.status === 201) {
          navigate('/login');
        } else if (response.status === 400) {
          return response.json();
        } else {
          navigate('/signup')
        }
      })
      .then(data => {
        if (data && data.message === 'Email is already in use') {
          setErrorMessage('Email is already registered');
        } else {
          setErrorMessage('');
        }
      });
  };


  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value)
  }

  const handleLastNameChange = (event) => {
    setLastName(event.target.value)
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleRetypePasswordChange = (event) => {
    setRetypePassword(event.target.value)
  }

    return (
      <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2> 
          <input placeholder="First Name" id="First Name" type='text' value={ firstName } onChange={handleFirstNameChange} />
          <input placeholder="Last Name" id="Last Name" type='text' value={ lastName } onChange={handleLastNameChange} />
          <input placeholder="Email" id="Email" type='text' value={ email } onChange={handleEmailChange} />
          <input placeholder="Password" id="Password" type='text' value={ password } onChange={handlePasswordChange} />
          <input placeholder="Retype Password" id="RetypePassword" type='text' value={ retypePassword } onChange={handleRetypePasswordChange} />
          <input role='submit' id='submit' className='primary-btn' type="submit" value="Sign Up" />
          {emptyFieldsError && <p style={{ color: 'red' }}>{emptyFieldsError}</p>}
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <p>Already have an account? <a href="/Login">Login</a></p>
      </form>
    );
}

export default SignUpForm;
