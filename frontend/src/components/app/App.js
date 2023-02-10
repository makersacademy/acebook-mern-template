import './App.css';
import LoginForm from '../auth/LoginForm';
import SignUpForm from '../user/SignUpForm';
import React, { useState } from 'react';
import Feed from '../feed/Feed';
import Navbar from '../navbar/Navbar';
import { useNavigate, Routes, Route } from 'react-router-dom';
import Profile from '../profile/Profile';

const App = () => {
  return (
    <div className="app-container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Feed navigate={useNavigate()} />} />

        <Route path="/posts" element={<Feed navigate={useNavigate()} />} />
        <Route path="/login" element={<LoginForm navigate={useNavigate()} />} />
        <Route
          path="/signup"
          element={<SignUpForm navigate={useNavigate()} />}
        />
        <Route path="/profile" element={<Profile navigate={useNavigate()} />} />
      </Routes>
    </div>
  );
};

export default App;
