import "./App.css";
import LoginForm from "../auth/LoginForm";
import NavBar from "../navbar/navbar";
import SignUpForm from "../user/SignUpForm";
import React, { useEffect, useState } from "react";
import Feed from "../feed/Feed";
import { useNavigate, Routes, Route } from "react-router-dom";

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("search query was changed: ", searchQuery);
  }, [searchQuery]);

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    setLoggedIn(false);
  };
  const handleLogin = () => {
    navigate("/login");
  };
  const handleSuccessfulLogin = () => {
    setLoggedIn(true);
  };

  return (
    <>
      <div>
        <NavBar
          navigate={useNavigate()}
          isLoggedIn={isLoggedIn}
          setLoggedIn={setLoggedIn}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
          setSearchQuery={setSearchQuery}
        />
      </div>
      <Routes>
        <Route
          path="/posts"
          element={
            <Feed
              navigate={useNavigate()}
              setSearchQuery={setSearchQuery}
              searchQuery={searchQuery}
            />
          }
          searchValue={searchQuery}
        />
        <Route
          path="/login"
          element={
            <LoginForm
              navigate={useNavigate()}
              onSuccess={handleSuccessfulLogin}
            />
          }
        />
        <Route
          path="/signup"
          element={<SignUpForm navigate={useNavigate()} />}
        />
      </Routes>
    </>
  );
};

export default App;
