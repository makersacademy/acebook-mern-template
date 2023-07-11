import React from "react";
// import "./Navbar.css";

const Navbar = ({
  onLogin,
  onSignup,
  onNotifications,
  onLogout,
  isUserLoggedIn,
}) => {
  return (
    <div className="navbar">
      <button className="navbar-button" onClick={onLogin}>
        Log In
      </button>
      <button className="navbar-button" onClick={onSignup}>
        Sign Up
      </button>
      {isUserLoggedIn ? (
        <>
          <button className="navbar-button" onClick={onNotifications}>
            Notifications
          </button>
          <button className="navbar-button" onClick={onLogout}>
            Logout
          </button>
        </>
      ) : null}
    </div>
  );
};

export default Navbar;
