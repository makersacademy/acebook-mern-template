import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({navigate}) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));


  useEffect(() => {
    setToken(window.localStorage.getItem("token"));
  }, []);

  const createPost = () => {
    navigate('/create-post')
  }

  const logout = () => {
    window.localStorage.removeItem("token")
    setToken(null)
    navigate('/login')
  }

  const navigateToLogin = () => {
    navigate('/login')
  }

  const navigateToSignup = () => {
    navigate('/signup')
  }

  if (token) {
    return (
    <nav>
      <div className="logo">
        <Link to='/posts'>
          <img className="navImage" src='logo-airbook-removebg.png' alt="logo" />
        </Link>
      </div>
      <button type="button" id="create-post-button" onClick={createPost}>Create Your Own Damn Post, Asshole</button>
      <button type="button" id="logout" onClick={logout}>
        Logout
      </button>
    </nav>
  );
    } else {
      return (
        <nav>
          <button type="button" id="login-btn" onClick={navigateToLogin}>Log in!</button>
          <button type="button" id="signup-btn" onClick={navigateToSignup}>Sign up!</button>
        </nav>
      )
    }
};

export default Navbar;


