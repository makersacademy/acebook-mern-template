import './App.css';
import SignUpForm from '../user/SignUpForm';
import React, { useState, useEffect } from 'react';
import Feed from '../feed/Feed';
import Home from '../home/Home';
import LoginForm from '../auth/LoginForm';

import {
  useNavigate,
  Routes,
  Route
} from "react-router-dom";

const App = () => {

    return (
      <body className="App">
        
        <Routes>
          <Route path='/' element={<Home navigate={ useNavigate() }/>} />
          <Route path='/signup' element={<SignUpForm navigate={ useNavigate() }/>}/>
          <Route path='/posts'  element={<Feed navigate={ useNavigate() }/>}/>
        </Routes>

      </body>
    );
}


export default App;