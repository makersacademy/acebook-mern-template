import './nav_bar.css';
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from './logo.png';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    window.localStorage.removeItem("token");
    navigate('/login');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  const handleLogoClick = () => {
    const token = window.localStorage.getItem('token');
    if (token) {
      navigate('/posts');
    }
  };

  const handleProfileClick = () => {
    navigate('/profile/');
  };

  const [isOpen, setIsOpen] = useState(false);
  const handleDropdownClick = () => setIsOpen(!isOpen);
  const token = window.localStorage.getItem('token');
  const isLoginPage = location.pathname === '/login';
  const isSignupPage = location.pathname === '/signup';

  return (
    <>
      <div className="navbar-container">
        <div className="logo-container">
          <div className="logo" onClick={handleLogoClick}>
            <img src={logo} alt="logo" className="spinning-logo" />
          </div>
        </div>
        {token ? (
          <div className="dropdown">
            <div className="dropdown-container">
              <button className="dropdown-button" onClick={handleDropdownClick}>
                Dropdown
              </button>
            </div>
            {isOpen && (
              <div className="dropdown-content">
                <button className="dropdown-item" onClick={handleProfileClick}>
                  Profile Settings
                </button>
                <div>
                  <button className="dropdown-logout" onClick={logout}>
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="login-signup">
              {isLoginPage && (
                <button className="signUpNav" onClick={handleSignupClick}>
                  Sign up page
                </button>
              )}
              {isSignupPage && (
                <button className="loginNav" onClick={handleLoginClick}>
                  Login page
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Navigation;

