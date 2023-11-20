import React, { useState } from 'react';

const LogInForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch( '/api/tokens', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password })
    })

    if(response.status !== 201) {
      setError("Incorrect email or password. Please try again.");
      navigate('/login')
    } else {
      setError(null);
      let data = await response.json()
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

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }

    return (
      <form onSubmit={handleSubmit} className='column'>
        <h2>Login</h2> 
        <input placeholder='Email' id="email" type='text' value={ email } onChange={handleEmailChange} />
        <div className="password-input-container">
          <input placeholder="Password" id="password" type={showPassword ? 'text' : 'password'} value={ password } onChange={handlePasswordChange} />
          
          <button type="button" onClick={toggleShowPassword} className="toggle-password-button">
          {showPassword ? '🙈' : '👀'} 
          </button>
        </div>
        <input role='submit' id='submit' className='primary-btn' type="submit" value="Login" />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <p>Don’t have an account? <a href="/signup">Sign up</a></p>
      </form>
    );
}

export default LogInForm;
