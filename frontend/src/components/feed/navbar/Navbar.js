import React from 'react';
import './Navbar.css'

const Navbar = ({ logout }) => {
  
  return (
    <>
      <div id='navbar-container'>
        <nav id="navbar">
          <h1>ACEBOOK</h1>
          <div id="navbar-btns">
            <button className="navbar-btn">My profile</button>
            <button className="navbar-btn">Photos</button>
            <button className="navbar-btn">Account</button>
            <button className="navbar-btn" onClick={logout}>Logout</button>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar;