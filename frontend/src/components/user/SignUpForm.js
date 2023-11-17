import React, { useState } from 'react';


const SignUpForm = ({ navigate }) => {

  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [RetypePassword, setRetypePassword] = useState("");
  
  


  const handleSubmit = async (event) => {
    event.preventDefault();



    fetch( 'api/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName: FirstName, lastName: LastName, email: Email, password: Password, retypePassword: RetypePassword })
    })
      .then(response => {
        if(response.status === 201) {
          navigate('/login')
        } else {
          navigate('/signup')
        }
      })
  }


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
          <input placeholder="First Name" id="First Name" type='text' value={ FirstName } onChange={handleFirstNameChange} />
          <input placeholder="Last Name" id="Last Name" type='text' value={ LastName } onChange={handleLastNameChange} />
          <input placeholder="Email" id="Email" type='text' value={ Email } onChange={handleEmailChange} />
          <input placeholder="Password" id="Password" type='text' value={ Password } onChange={handlePasswordChange} />
          <input placeholder="Retype Password" id="RetypePassword" type='text' value={ RetypePassword } onChange={handleRetypePasswordChange} />
          <input role='submit' id='submit' className='primary-btn' type="submit" value="Sign Up" />
          <p>Already have an account? <a href="/Login">Login</a></p>
      </form>
    );
}

export default SignUpForm;
