import React, { useState } from 'react';
import Card from '../Helpers/Card';
import './SignUpForm.css';

const SignUpForm = ({ navigate }) => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [bio, setBio] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch( '/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name, email: email, password: password, age: age})
    })
      .then(response => {
        if(response.status === 201) {
          navigate('/login')
        } else {
          navigate('/signup')
        }
      })
  }

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleAgeChange = (event) => {
    setAge(event.target.value)
  }

  const handleBioChange = (event) => {
    setBio(event.target.value)
  }


    return (
      <div className='signup'>
         <h1>
        Acebook
      </h1>
      <h3>
        Sign up
      </h3>
      <h4>It's quick and easy!</h4>
      <Card>
      <form className='signup-form' onSubmit={handleSubmit}>
        <input placeholder="Name" id="name" type='text' value={ name } onChange={handleNameChange} />
        <input placeholder="Email" id="email" type='text' value={ email } onChange={handleEmailChange} />
        <input placeholder="Password" id="password" type='password' value={ password } onChange={handlePasswordChange} />
        <input placeholder="Age" id="age" type='number' value={ age } onChange={handleAgeChange} />
        <input placeholder="Bio" id="bio" type='text' value={ bio } onChange={handleBioChange} />
        <input id='submit' type="submit" value="Submit" />
      </form>
      </Card>
      <h4>already have an account?</h4>
      <a href='/login'>log in</a> 
      </div>
    );
}

export default SignUpForm;
