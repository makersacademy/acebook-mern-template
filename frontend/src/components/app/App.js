import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../user/SignUpForm";
import Feed from "../feed/Feed";
import Navbar from "../navbar/Navbar";
import SearchBar from "../searchbar/SearchBar";
import NotificationButton from "../notification/NotificationButton";
import ProfileButton from "../profile/ProfileButton";
import "./App.css";

const App = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);

  const navigate = useNavigate();

  const openLoginForm = () => setShowLoginForm(true);
  const closeLoginForm = () => setShowLoginForm(false);

  const openSignUpForm = () => setShowSignUpForm(true);
  const closeSignUpForm = () => setShowSignUpForm(false);

  return (
    <div className="app-container">
      <div className="header">
        <h1>ACEBOOK</h1>
      </div>

      <div className="content">
        <div className="top-bar">
          <div className="top-left">
            <Navbar />
          </div>
          <div className="top-right">
            <NotificationButton />
            <button onClick={openLoginForm}>Log In</button>
            <button onClick={openSignUpForm}>Sign Up</button>
            <ProfileButton />
          </div>
        </div>

        <div className="feed-container">
          <SearchBar />
          <Feed navigate={navigate} />
        </div>
      </div>

      {showLoginForm && (
        <LoginForm navigate={navigate} onClose={closeLoginForm} />
      )}

      {showSignUpForm && (
        <SignUpForm navigate={navigate} onClose={closeSignUpForm} />
      )}
    </div>
  );
};

export default App;
