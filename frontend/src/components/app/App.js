import './App.css';
import LandingPage from '../landing/LandingPage';
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../user/SignUpForm'
import React, { useState } from 'react';
import Feed from '../feed/Feed'
import {
  useNavigate,
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import Navbar from '../Navbar/Navbar';

const App = () => {
  const location = useLocation().pathname
    return (
      <>
      <Navbar location={location}/>
        <Routes>
          <Route path='/'  element={<LandingPage navigate={ useNavigate() }/>}/>
          <Route path='/posts'  element={<Feed navigate={ useNavigate() }/>}/>
          <Route path='/login'  element={<LoginForm  navigate={ useNavigate() }/>}/>
          <Route path='/signup' element={<SignUpForm navigate={ useNavigate() }/>}/>
        </Routes>
      </>
    );
}

export default App;
