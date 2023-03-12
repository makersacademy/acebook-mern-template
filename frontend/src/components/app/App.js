import "./App.css";
import React from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../user/SignUpForm";
import Feed from "../feed/Feed";
import Card from "../card/Card";

const App = () => {
  return (
    <Routes>
      <Route path="/posts" element={<Feed navigate={useNavigate()} />} />
      <Route path="/login" element={<LoginForm navigate={useNavigate()} />} />
      <Route path="/signup" element={<SignUpForm navigate={useNavigate()} />} />
      <Route path="/card" element={<Card />} />
    </Routes>
  );
};

export default App;
