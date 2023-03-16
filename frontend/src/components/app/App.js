import "./App.css";
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../user/SignUpForm";
//import React, { useState } from 'react';
import Feed from "../feed/Feed";
import { useNavigate, Routes, Route } from "react-router-dom";
import UserProfile from "../UserProfile/UserProfile";

const App = () => {
  return (
    <Routes>
      <Route path="/posts" element={<Feed navigate={useNavigate()} />} />
      <Route path="/login" element={<LoginForm navigate={useNavigate()} />} />
      <Route path="/signup" element={<SignUpForm navigate={useNavigate()} />} />
      <Route path="/user/:id" element={<UserProfile navigate={useNavigate()} />} />
    </Routes>
  );
};

export default App;
