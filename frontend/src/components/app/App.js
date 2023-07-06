import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../user/SignUpForm";
import Feed from "../feed/Feed";
import Navbar from "../navbar/Navbar";
import SearchBar from "../searchbar/SearchBar";
import NotificationModal from "../notification/NotificationButton";
import ProfileButton from "../profile/ProfileButton";
import "./App.css";

const App = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  const navigate = useNavigate();

  const handleLogin = () => setShowLoginForm(true); // Renamed to handleLogin
  const handleSignup = () => setShowSignUpForm(true); // Renamed to handleSignup
  const handleNotifications = () => setShowNotificationModal(true);

  return (
    <div className="app-container">
      <div className="header">
        <h1>ACEBOOK</h1>
      </div>

      <div className="main-content">
        <Navbar
          onLogin={handleLogin}
          onSignup={handleSignup}
          onNotifications={handleNotifications}
        />

        <div className="content">
          <div className="top-bar">
            <div className="top-right">
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

      {showNotificationModal && (
        <NotificationModal
          navigate={navigate}
          onClose={() => setShowNotificationModal(false)}
        />
      )}
    </div>
  );
};

export default App;
