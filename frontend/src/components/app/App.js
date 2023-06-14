import './App.css';
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../user/SignUpForm'
import React, { useState } from 'react';
import Feed from '../feed/Feed'
import {
  useNavigate,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

const App = () => {
  return (
      <> 
        <div className='logo'>
        <img src="https://www.dropbox.com/s/j7fqdd02ttkt97a/acebook-logos_white.png?raw=1" alt="Logo" />
        </div>
        <Routes>
          <Route path='/'  element={ <Navigate to="/posts"/> }/>
          <Route path='/posts'  element={<Feed navigate={ useNavigate() }/>}/>
          <Route path='/login'  element={<LoginForm  navigate={ useNavigate() }/>}/>
          <Route path='/signup' element={<SignUpForm navigate={ useNavigate() }/>}/>
        </Routes>
      </>
  );
}

export default App;
