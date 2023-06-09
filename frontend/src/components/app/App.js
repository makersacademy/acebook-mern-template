import './App.css';
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../user/SignUpForm'
import Profile from '../profile/Profile'
import React, { useState } from 'react';
import Feed from '../feed/Feed'
import {
  useNavigate,
  Routes,
  Route,
  useParams
} from "react-router-dom";

const App = () => {
    return (
        <Routes>
          <Route path='/posts'  element={<Feed navigate={ useNavigate() }/>}/>
          <Route path='/login'  element={<LoginForm  navigate={ useNavigate() }/>}/>
          <Route path='/signup' element={<SignUpForm navigate={ useNavigate() }/>}/>
          <Route path='/user/:username' element={<Profile navigate={ useNavigate() } params={ useParams }/>}/>
        </Routes>
    );
}

export default App;
