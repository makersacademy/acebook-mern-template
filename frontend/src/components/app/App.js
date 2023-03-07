import './App.css';
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../user/SignUpForm'
import Homepage from '../homepage/Homepage'
import React, { useState } from 'react';
import Feed from '../feed/Feed'
import {
  useNavigate,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from '../navbar/Navbar';

const App = () => {
    return (
      <>
        <Navbar></Navbar>
        <Routes>
          <Route path='/'  element={<Homepage navigate={ useNavigate() }/>}/>
          <Route path='/posts'  element={<Feed navigate={ useNavigate() }/>}/>
          <Route path='/login'  element={<LoginForm  navigate={ useNavigate() }/>}/>
          <Route path='/signup' element={<SignUpForm navigate={ useNavigate() }/>}/>
        </Routes>
      </>
    );
}

export default App;
