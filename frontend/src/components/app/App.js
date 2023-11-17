import './App.css';
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../user/SignUpForm'
import React, { useState } from 'react';
import Feed from '../feed/Feed'
import Profile from '../user/Profile';
import {
  useNavigate,
  Routes,
  Route,
} from "react-router-dom";

const App = () => {
    return (
      <div className='content-box'>
        <Routes>
          <Route path='/posts'  element={<Feed navigate={ useNavigate() }/>}/>
          <Route path='/login'  element={<LoginForm  navigate={ useNavigate() }/>}/>
          <Route path='/signup' element={<SignUpForm navigate={ useNavigate() }/>}/>
          <Route path='/profile' element={<Profile navigate={ useNavigate() }/>}/>
        </Routes>
      </div>
    );
}

export default App;
