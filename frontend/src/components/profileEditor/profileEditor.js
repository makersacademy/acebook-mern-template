import React, { useState } from 'react';

const ProfileEditor = ({ navigate }) => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [bio, setBio] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch( '/users', {
      method: 'update',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name, email: email, password: password, age: age, bio: bio})
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
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" id="name" type='text' value={ name } onChange={handleNameChange} />
        <input placeholder="Email" id="email" type='text' value={ email } onChange={handleEmailChange} />
        <input placeholder="Password" id="password" type='password' value={ password } onChange={handlePasswordChange} />
        <input placeholder="Age" id="age" type='number' value={ age } onChange={handleAgeChange} />
        <input placeholder="Bio" id="bio" type='text' value={ bio } onChange={handleBioChange} />
        <input id='submit' type="submit" value="Submit" />
      </form>
    );
}

export default ProfileEditor;