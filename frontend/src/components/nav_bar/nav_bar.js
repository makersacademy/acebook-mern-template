import './nav_bar.css'
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo1 from './moan-name.png'
import logo2 from './moan-mongoose.png'

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    window.localStorage.removeItem("token");
    
    navigate('/login');
  };
  
  const handleLoginClick = () => {
   navigate('/login')
  }
  const handleSignupClick = () => {
   navigate('/signup')
  }

  const handleLogoClick = () => {
    if (token) {
      navigate('/posts')
    }
  }

  const handleProfileClick = () => {
    navigate('/profile/');
  };

  const [isOpen, setIsOpen] = useState(false);
  const handleDropdownClick = () => setIsOpen(!isOpen);
  const token = window.localStorage.getItem('token');
  const isLoginPage = location.pathname === '/login';
  const isSignupPage = location.pathname === '/signup'; 
  const isGoodbyePage = location.pathname === '/goodbye';

  return ( 
    <div className='navbar-container'>
      <div className='nav-section'>
        {/* this is needed to centre the logo. */}
      </div>
      <div className='nav-section logo-container'>
        <div id="container" className="logo-container" onClick={handleLogoClick}>
          <img src={logo1} alt="logo1" className="logo1"></img>
          <img src={logo2} alt="logo2" className="logo2"></img>
        </div>
      </div>
      <div className='nav-section'>
        { token ? (
          <div className="dropdown">
            <div className='dropdown-container'>
              <button className="dropdown-button" onClick={handleDropdownClick}>
              ⚪ ⚪ ⚪
              </button>
            </div>
            {isOpen && (
            <div className="dropdown-content">
              <button className="dropdown-item" onClick={handleProfileClick}>Profile Settings</button>
              <div>
                <button className='dropdown-logout' onClick={logout}>Logout</button>
              </div>
            </div>
            )}
          </div>
        ) : (
          <div className='login-signup'>
            {isLoginPage && <button className='signUpNav' onClick={handleSignupClick}>Sign up page</button>}
            {isSignupPage && <button className='loginNav' onClick={handleLoginClick}>Login page</button>}
            {isGoodbyePage && <button className='signUpNav' onClick={handleLoginClick}>Sign up page</button>}
          </div>
        )}
      </div>
    </div>
  )
};

export default Navigation;
