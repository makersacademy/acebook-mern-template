import React, { useState } from 'react';

const LogInForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch( '/tokens', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password })
    })

    if(response.status !== 201) {
      setErrorMessage('Invalid user!');
      navigate('/login')
    } else {
      let data = await response.json()
      window.localStorage.setItem("userid", data.userid)
      window.localStorage.setItem("token", data.token)
      navigate('/posts');
    }
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }


  const signup = () => {
    navigate('/signup')
  }


    return (
      <div class='signin'>
        <h1 class='acebook'><img src="https://i.ibb.co/1Rsnzft/s-l1200.jpg" alt="s-l1200" width="70px" height="100px" border='3px solid'/>cebook</h1>
        <h2 class='formheader'>Sign in</h2>
        <form onSubmit={handleSubmit}>
          <input placeholder='Email' id="email" type='text' value={ email } onChange={handleEmailChange} />
          <br></br>
          <br></br>
          <input placeholder='Password' id="password" type='password' value={ password } onChange={handlePasswordChange} />
          <br></br>
          <br></br>
          <input role='submit-button' id='submit' type="submit" value="Sign in!" />
          {errorMessage && (
            <p className="error"> {errorMessage} </p>
            )}
          <br></br>
          <br></br>
        </form>
        <br></br>
        <button onClick={signup}>
          Not registered? Sign up here!
        </button>
        </div>
      );
}

export default LogInForm;
