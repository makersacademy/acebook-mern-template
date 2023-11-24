// import React from "react";
import "./HomePage.css"
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import logo from './assets/download.png'

const HomePage = () => {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  // Checks to see if logged in and redirects to /posts if token exists
  useEffect(() => {
    if (window.localStorage.getItem("token") !== null) {
      navigate("/posts");
    }
  }, [navigate]);

  return (
    <>
      <img src={logo} alt="AceBook Logo" className="homepage-logo" />
      <div className="button-container">
        <button onClick={handleLoginClick} className="button" id="login-button">
          Log in
        </button>
        <br />
        <button onClick={handleSignUpClick} className="button" id="signup-button">
          Create an account
        </button>
      </div>
    </>
  );
};

export default HomePage;
