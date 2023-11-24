// import React from "react";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

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
      <h1 className="welcome-banner" style={{ textAlign: "center" }}>
        {" "}
        Welcome to AceBook
      </h1>
      <div>
        <button className="button-7" onClick={handleLoginClick} id="login-button">
          Log in
        </button>{" "}
        <br></br>
        <button onClick={handleSignUpClick} id="signup-button">
          Create an account
        </button>
      </div>
    </>
  );
};

export default HomePage;
