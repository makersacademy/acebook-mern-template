 import nav_bar from './nav_bar.css'
 import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Feed from '../feed/Feed';

const Navigation = () => {
  const navigate = useNavigate();

  const logout = () => {
    window.localStorage.removeItem("token");
    navigate('/login');
  };

  const [isOpen, setIsOpen] = useState(false);
  const handleDropdownClick = () => setIsOpen(!isOpen);

  return (
    <div className="dropdown">
      <button className="dropdown-button" onClick={handleDropdownClick}>
        Dropdown
      </button>
      {isOpen && (
        <div className="dropdown-content">
          <button className="dropdown-item">Profile Settings</button>
          <div>
            <button onClick={logout}>Logout</button>
          </div>
        </div>
      )}
    </div>
  );
};






  export default Navigation;

 
