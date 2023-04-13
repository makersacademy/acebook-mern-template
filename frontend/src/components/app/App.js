import './App.css';
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../user/SignUpForm'
import React, { useState } from 'react';
import Feed from '../feed/Feed'
import Navbar from '../nav/nav';
import Home from '../home';

import {
  useNavigate,
  Routes,
  Route,
} from "react-router-dom";

const App = () => {
  // let Component 
  // switch ((window.location.pathname)) {
  //   case "/":
  //     Component = Home
  //     break
  //   case "/signup":
  //     Component = SignUpForm 
  //     break
  //   case "/login":
  //     Component = LoginForm
  //     break
  // }  
  
  return (
      <>
        
        <Routes>
          <Route path='/' element={<Home navigate={ useNavigate() }/>}/>
          <Route path='/posts'  element={<Feed navigate={ useNavigate() }/>}/>
          <Route path='/login'  element={<LoginForm  navigate={ useNavigate() }/>}/>
          <Route path='/signup' element={<SignUpForm navigate={ useNavigate() }/>}/>
        </Routes>
      </>
    );
}

export default App;
