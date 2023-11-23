import './App.css';
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../user/SignUpForm'
import React, { useState } from 'react';
import Feed from '../feed/Feed'
import Profile from '../user/Profile';
import LoggedIn from '../navbar/LoggedIn';
import Navbar from '../navbar/Navbar';
import NotAuthNavbar from '../navbar/NotAuthNavbar'; 
import LoggedOut from '../navbar/LoggedOut';
import {
  useNavigate,
  Routes,
  Route,
} from "react-router-dom";

const App = () => {
    return (
      <div>
      <LoggedIn>
          <Navbar />
      </LoggedIn>
      <LoggedOut>
          <NotAuthNavbar />
      </LoggedOut>
      <div className='main-container'>
        <Routes>
          <Route path='/posts'  element={<Feed navigate={ useNavigate() }/>}/>
          <Route path='/login'  element={<LoginForm  navigate={ useNavigate() }/>}/>
          <Route path='/signup' element={<SignUpForm navigate={ useNavigate() }/>}/>
          <Route path='/profile' element={<Profile navigate={ useNavigate() }/>}/>
        </Routes>
      </div>
      </div>
    );
}

export default App;
