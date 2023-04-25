import "./App.css";
import LandingPage from "../landing/LandingPage";
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../user/SignUpForm";
import React, { useState } from "react";
import Feed from "../feed/Feed";
import { useNavigate, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <section className="main">
      <div className="background"></div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#3360FF"
          fill-opacity="0.26"
          d="M0,96L80,85.3C160,75,320,53,480,64C640,75,800,117,960,117.3C1120,117,1280,75,1360,53.3L1440,32L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
      </svg>
      <Routes>
        <Route path="/" element={<LandingPage navigate={useNavigate()} />} />
        <Route path="/posts" element={<Feed navigate={useNavigate()} />} />
        <Route
          path="/posts/new"
          element={<NewPost navigate={useNavigate()} />}
        />
        <Route path="/login" element={<LoginForm navigate={useNavigate()} />} />
        <Route
          path="/signup"
          element={<SignUpForm navigate={useNavigate()} />}
        />
      </Routes>
    </section>
  );
};

export default App;
