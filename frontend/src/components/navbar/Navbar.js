import React from "react";
// import "./Navbar.css";

const Navbar = ({ onLogin, onSignup }) => {
  return (
    <div className="navbar">
      <button className="navbar-button" onClick={onLogin}>
        Log In
      </button>
      <button className="navbar-button" onClick={onSignup}>
        Sign Up
      </button>
    </div>
  );
};

export default Navbar;
