import React from 'react';

const Homepage = ({ navigate }) => {
  const navigateToLogin = () => {
    navigate('/login')
  }

  const navigateToSignup = () => {
    navigate('/signup')
  }

  return(
    <>
      <button type="button" id="login-btn" onClick={navigateToLogin}>Log in!</button>
      <button type="button" id="signup-btn" onClick={navigateToSignup}>Sign up!</button>
    </>
  )
}

export default Homepage;
