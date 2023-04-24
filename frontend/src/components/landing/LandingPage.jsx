import React from "react";

const LandingPage = ({ navigate }) => {

  const link = () => {
    navigate('/signup')
  }

  return (
    <>
      <div class="header">LandingPage</div>
      <p className="text">Miaow then turn around</p>
      <button class="user-btn" onClick={link}>
        Sign Up
      </button>
    </>
  );
};

export default LandingPage;
