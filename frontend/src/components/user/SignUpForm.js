import React, { useState } from 'react';

const SignUpForm = ({ navigate }) => {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    setError(null)
    event.preventDefault();

    const response = await fetch( '/users/signup', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password })
    })
    const data = await response.json()
    if (response.status === 201) {
      navigate('/login')
      } else {
      setError(data.error)
      navigate('/signup')
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
          <input placeholder="Email" id="email" type='text' value={ email } onChange={handleEmailChange} />
          <input placeholder="Password" id="password" type='password' value={ password } onChange={handlePasswordChange} />
        <input id='submit' type="submit" value="Submit" />
        {error && <div className="error">{error}</div>}
      </form>

    );
}

export default SignUpForm;
