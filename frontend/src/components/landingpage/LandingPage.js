import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import Feed from '../feed/Feed';
import SignUpForm from '../user/SignUpForm';
import heroImage from './hero-image.png';
import NavBar from '../navbar/NavBar';

const LandingPage = ({ navigate }) => {

  const token = localStorage.getItem('token');
  const navigation = useNavigate();

  return (
    <>
    <NavBar navigate={ navigation } /> 
    <div className="hero-container">
      <div className="signup-container">
        <SignUpForm navigate={ navigation } />
      </div>
      <div className="hero-image-container">
        <img src={ heroImage } alt="Acebook Hero Image" />
      </div>
    </div>
    </>
    );
}

export default LandingPage;