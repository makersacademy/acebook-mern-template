import React, { useState } from "react";
import {
  useNavigate,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

import LoginForm from "../auth/LoginForm";
import SignUpForm from "../user/SignUpForm";
import SinglePost from "../singlePost/SinglePost";
import Profile from "../profile/Profile";
import Feed from "../feed/Feed";
import "./navbar.css";

const logout = () => {
  window.localStorage.removeItem("token");
  window.location.href = "/login";
};

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <Link to="/posts">Feed</Link>
        </li>
        <li>
          <Link to="/users/me">Profile</Link>
        </li>
        <li>
          <a href="#" onClick={logout}>
            Logout
          </a>
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
      <div className="main-container">
        <Routes>
          <Route
            path="/posts/:id"
            element={<SinglePost navigate={useNavigate()} />}
          />
          <Route path="/" element={<Feed navigate={useNavigate()} />} />
          <Route path="/posts" element={<Feed navigate={useNavigate()} />} />
          <Route
            path="/login"
            element={<LoginForm navigate={useNavigate()} />}
          />
          <Route
            path="/signup"
            element={<SignUpForm navigate={useNavigate()} />}
          />
          <Route
            path="/users/:id"
            element={<Profile navigate={useNavigate()} />}
          />
          <Route
            path="/profile"
            element={<Profile navigate={useNavigate()} />}
          />
        </Routes>
      </div>
    </>
  );
};

export default App;
