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

  const handleLogin = () => setShowLoginForm(true); // Renamed to handleLogin
  const handleSignup = () => setShowSignUpForm(true); // Renamed to handleSignup

  return (
    <div className="app-container">
      <div className="header">
        <h1>ACEBOOK</h1>
      </div>

      <div className="main-content">
        <Navbar onLogin={handleLogin} onSignup={handleSignup} />

        <div className="content">
          <div className="top-bar">
            <div className="top-right">
              <NotificationButton />
              <ProfileButton />
            </div>
          </div>

          <div className="feed-container">
            <SearchBar />
            <Feed navigate={navigate} />
          </div>
        </div>
      </div>

      {showLoginForm && (
        <LoginForm
          navigate={navigate}
          onClose={() => setShowLoginForm(false)}
        />
      )}

      {showSignUpForm && (
        <SignUpForm
          navigate={navigate}
          onClose={() => setShowSignUpForm(false)}
        />
      )}
    </div>
  );
};

export default App;
