import './App.css';
import LoginForm from '../auth/LoginForm';
import SignUpForm from '../user/SignUpForm';
import React from 'react';
import Feed from '../feed/Feed';
import TestSignUp from '../signupForm/SignUpForm';
import CommentForm from '../postCommentForm/CommentForm';
import { useNavigate, Routes, Route } from 'react-router-dom';
import LikeButton from '../likeButton/LikeButton';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/posts" element={<Feed navigate={useNavigate()} />} />
        <Route path="/login" element={<LoginForm navigate={useNavigate()} />} />
        <Route
          path="/signup"
          element={<SignUpForm navigate={useNavigate()} />}
        />
        <Route path="/test" element={<TestSignUp />} />
        {/* This is a test path for testing individual components and should be removed in production.*/}
        <Route path="/comment" element={<CommentForm />} />
        {/* This is a test path for testing individual components and should be removed in production.*/}
        {/* <Route path="/likes" element={<LikeButton />} /> */}
      </Routes>
    </>
  );
};

export default App;
