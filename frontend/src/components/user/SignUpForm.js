import React, { useState } from 'react';

const SignUpForm = ({ navigate }) => {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [aboutMe, setAboutMe] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value)
  }
  
  const handleAboutMeChange = (event) => {
    setAboutMe(event.target.value)
  }
  
  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = async (event) => {
    setError(null)
    event.preventDefault();

    const response = await fetch( '/users/signup', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name, email: email, password: password, aboutMe: aboutMe, friends: [] })
    })
    const data = await response.json()
    if (response.status === 201) {
      navigate('/login')
      } else {
      setError(data.error)
      navigate('/signup')
    }
  }


    return (
      <form onSubmit={handleSubmit}>
        <input placeholder='Name' id="name" type='text' value={ name } onChange={handleNameChange} />
        <input placeholder='About me' id="aboutMe" type='text' value={ aboutMe } onChange={handleAboutMeChange} />
        <input placeholder="Email" id="email" type='text' value={ email } onChange={handleEmailChange} />
        <input placeholder="Password" id="password" type='password' value={ password } onChange={handlePasswordChange} />
        <input id='submit' type="submit" value="Submit" />
        {error && <div className="error">{error}</div>}
      </form>

    );
}

export default SignUpForm;
