import './App.css';
import NavBar from '../navbar/NavBar.js';
import LoginForm from '../auth/LoginForm';
import SignUpForm from '../user/SignUpForm';
import CreatePostForm from '../createpost/CreatePostForm';
import React, { useState } from 'react';
import Feed from '../feed/Feed';
import {
  useNavigate,
  Routes,
  Route,
} from "react-router-dom";

const App = () => {
    return (
      <>
        <NavBar navigate={ useNavigate() } /> 
        <Routes>
          <Route path='/posts'  element={<Feed navigate={ useNavigate() }/>}/>
          <Route path='/login'  element={<LoginForm  navigate={ useNavigate() }/>}/>
          <Route path='/signup' element={<SignUpForm navigate={ useNavigate() }/>}/>
          <Route path='/createpost' element={<CreatePostForm navigate={ useNavigate() }/>}/>

        </Routes>
        <SignUpForm navigate={ useNavigate() } />
      </>
    );
};

export default App;
