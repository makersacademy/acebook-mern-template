import "./App.css";
import LoginForm from "../auth/LoginForm";
import NavBar from "./NavBar";
import SignUpForm from "../user/SignUpForm";
import React, { useState } from "react";
import Feed from "../feed/Feed";
import { useNavigate, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <NavBar></NavBar>
      <Route path="/posts" element={<Feed navigate={useNavigate()} />} />
      <Route path="/login" element={<LoginForm navigate={useNavigate()} />} />
      <Route path="/signup" element={<SignUpForm navigate={useNavigate()} />} />
    </Routes>
  );
};

export default App;
