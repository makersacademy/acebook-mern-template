import React from 'react';
import { Link } from 'react-router-dom';
import LogoSearch from './LogoSearch';
import './navbar.css';

const Navbar = () => {
  const logout = () => {
    // Handle logout logic
  };

  return (
    <nav className="navbar">
      <LogoSearch />
      <ul className="nav-links">
        <li>
          <Link to="/posts">Posts</Link>
        </li>
        <li>
          <Link to="/login">Home</Link>
        </li>
        <li>
          <Link to="/help">Help</Link>
        </li>
        <li>
          <Link to="/" onClick={logout}>
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
