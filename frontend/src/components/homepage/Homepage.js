import React, { useEffect, useState } from 'react';

const Homepage = ({ navigate }) => {
  const [token,] = useState(window.localStorage.getItem("token"));

  useEffect(() => {
    if(token) {
      navigate('/posts')
    }
  }, [])

  const navigateToLogin = () => {
    navigate('/login')
  }

  const navigateToSignup = () => {
    navigate('/signup')
  }

  return(
      <>
        <p>{token}</p>
        <button type="button" id="login-btn" onClick={navigateToLogin}>Log in!</button>
        <button type="button" id="signup-btn" onClick={navigateToSignup}>Sign up!</button>
      </>
    )
}

export default Homepage;
