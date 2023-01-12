import React, { useState } from 'react';

const LogInForm = ({ navigate }) => {
  const [error, setError] = useState(null)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    setError(null)
    event.preventDefault();
    let response = await fetch( '/users/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password })
    })
    const data = await response.json()
    if(response.status !== 200) {
      setError(data.error)
      navigate('/login')
    } else {
      window.localStorage.setItem("token", data.token)

      window.localStorage.setItem("user_id", data.user._id)
      navigate('/posts');
    }
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }


    return (
      <form onSubmit={handleSubmit}>
        <input placeholder='Email' id="email" type='text' value={ email } onChange={handleEmailChange} />
        <input placeholder='Password' id="password" type='password' value={ password } onChange={handlePasswordChange} />
        <input role='submit-button' id='submit' type="submit" value="Submit" />
        {error && <div className="error">{error}</div>}
      </form>
    );
}

export default LogInForm;
