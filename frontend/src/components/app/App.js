import "./App.css";
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../user/SignUpForm";
import SinglePost from "../singlePost/SinglePost";
import Profile from "../profile/Profile";
import React, { useState } from "react";
import Feed from "../feed/Feed";
import { useNavigate, Routes, Route, useLocation } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <a href="/posts">Posts</a>
        </li>
        <li>
          <a href="/login">Home</a>
        </li>
        <li>
          <a href="/help">Help</a>
        </li>
      </ul>
    </nav>
  );
};

const App = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/login" && <Navbar />}
      <Routes>
        <Route
          path="/posts/:id"
          element={<SinglePost navigate={useNavigate()} />}
        />
        <Route path="/" element={<Feed navigate={useNavigate()} />} />
        <Route path="/posts" element={<Feed navigate={useNavigate()} />} />
        <Route path="/login" element={<LoginForm navigate={useNavigate()} />} />
        <Route
          path="/signup"
          element={<SignUpForm navigate={useNavigate()} />}
        />
        <Route
          path="/users/:id"
          element={<Profile navigate={useNavigate()} />}
        />
      </Routes>
    </>
  );
};

export default App;
