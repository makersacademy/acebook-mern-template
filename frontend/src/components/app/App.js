import './App.css';
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../user/SignUpForm'
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Feed from '../feed/Feed'
import {
  useNavigate,
  Routes,
  Route,
} from "react-router-dom";

const App = () => {
    return (
      <div>    
        <div className="container">
          <nav className="navbar">
            <div className="navbar-brand">Welcome To Acebook</div>
            <ul className="navbar-nav">
              <li><Link to="/signup">Sign Up</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul>
          </nav>
        </div>
        <Routes>
          <Route path='/posts'  element={<Feed navigate={ useNavigate() }/>}/>
          <Route path='/login'  element={<LoginForm  navigate={ useNavigate() }/>}/>
          <Route path='/signup' element={<SignUpForm navigate={ useNavigate() }/>}/>
          <Route path='*' element={<Navigate to='/login' />} />
        </Routes>
      </div>
    );
}

export default App;
