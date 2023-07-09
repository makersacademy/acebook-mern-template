import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Link,
} from "react-router-dom";
import LoginForm from "../auth/LoginForm";
import LogoutForm from "../auth/LogoutForm";
import SignUpForm from "../user/SignUpForm";
import Feed from "../feed/Feed";
import Navbar from "../navbar/Navbar";
import SearchBar from "../searchbar/SearchBar";
import NotificationModal from "../notification/NotificationButton";
import ProfileButton from "../profile/ProfileButton";
import Profile from "../profile/ProfilePage";
import FeedButton from "../feed/FeedButton";

import "./App.css";

const App = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showLogoutForm, setShowLogoutForm] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const navigate = useNavigate();

  const handleLogin = () => setShowLoginForm(true); // Renamed to handleLogin
  const handleSignup = () => setShowSignUpForm(true); // Renamed to handleSignup
  const handleNotifications = () => setShowNotificationModal(true);
  const handleLogout = () => setShowLogoutForm(true);

  const handleSuccessfulLogin = () => {
    setIsUserLoggedIn(true);
    // ...other stuff, like closing the modal
  };

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token && token !== "null" && token !== "undefined") {
      console.log(`token in if statement ${token}`);
      setIsUserLoggedIn(true);
    }
  }, []);

  return (
    <div className="app-container">
      <div class="header">
        <Link class="header-link" to="/">
          <h1 class="header-title">ACEBOOK</h1>
        </Link>
      </div>

      <div className="main-content">
        <Navbar
          onLogin={handleLogin}
          onSignup={handleSignup}
          onNotifications={handleNotifications}
          onLogout={handleLogout}
        />

        <div className="content">
          <div className="top-bar">
            <div className="top-right">
              <FeedButton />
              <ProfileButton />
            </div>
          </div>

          <div className="feed-container">
            <SearchBar />
            <Routes>
              <Route
                path="/"
                element={
                  isUserLoggedIn ? (
                    <Feed navigate={navigate} />
                  ) : (
                    <div>Please log in to see the feed.</div>
                  )
                }
              />
              <Route
                path="/profile"
                element={
                  isUserLoggedIn ? (
                    <Profile />
                  ) : (
                    <div>Please log in to see the feed.</div>
                  )
                }
              />
            </Routes>
          </div>
        </div>
      </div>

      {showLoginForm && (
        <LoginForm
          navigate={navigate}
          onClose={() => setShowLoginForm(false)}
          handleSuccessfulLogin={handleSuccessfulLogin} // <-- pass this method to the LoginForm component
        />
      )}

      {showLogoutForm && (
        <LogoutForm
          navigate={navigate}
          onClose={() => setShowLogoutForm(false)}
          setIsUserLoggedIn={setIsUserLoggedIn}
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
