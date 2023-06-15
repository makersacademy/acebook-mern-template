import React, { useState } from 'react';
import './SignUpForm.css';

const SignUpForm = ({ navigate }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");

 
  const handleSubmit = async (event) => {
    event.preventDefault();

    const races = ["dwarf", "hobbit", "wizard", "sauron", "orc", "elf", "man", "wraith"]
    const index = Math.floor(Math.random() * races.length);
    const chosenRace = races[index]

    fetch( '/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password, username: username, name: name, race: chosenRace })
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

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handleNameChange = (event) => {
    setName(event.target.value)
  }
  
    return (
      <div className="signUpContainer">
        <h1 className="signUpHeading"> Start your journey to Mordor.... </h1>
        <form className="signUpForm" onSubmit={handleSubmit}>
            <input className="formInput" placeholder='Name' id="name" type='text' value={ name } onChange={handleNameChange} />
            <input className= "formInput" placeholder="Username" id="username" type="text" value={ username } onChange={ handleUsernameChange } />
            <input className= "formInput" placeholder="Email" id="email" type='text' value={ email } onChange={handleEmailChange} />
            <input className= "formInput" placeholder="Password" id="password" type='password' value={ password } onChange={handlePasswordChange} />
          <input  className= "inputButton" id='submit' type="submit" value="Submit" />
        </form>
      </div>
    );
}

export default SignUpForm;
