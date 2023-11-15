import "./App.css";
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../user/SignUpForm";
import React, { useState } from "react";
import Feed from "../feed/Feed";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import AvatarChoiceForm from "../user/AvatarChoiceForm";

const App = () => {
  return (
    <Routes>
      <Route path="/posts" element={<Feed navigate={useNavigate()} />} />
      <Route path="/login" element={<LoginForm navigate={useNavigate()} />} />
      <Route path="/signup" element={<SignUpForm navigate={useNavigate()} />} />
      {/* choose-avatar route uses useLocation hook to retrieve user email from signup page */}
      <Route
        path="/choose-avatar"
        element={<AvatarChoiceForm location={useLocation()} navigate={useNavigate()} />}
      />
    </Routes>
  );
};

export default App;
