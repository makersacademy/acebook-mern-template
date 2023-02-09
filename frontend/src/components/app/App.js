import './App.css';
import LoginForm from '../auth/LoginForm';
import SignUpForm from '../user/SignUpForm';
import React, { useState } from 'react';
import Feed from '../feed/Feed';
import Navbar from '../navbar/Navbar';

import {
  useNavigate,
  Routes,
  Route,
} from "react-router-dom";

const App = () => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  
    return (
      <>
        <Navbar navigate={ useNavigate() } signedIn={ token }/>
        <Routes>
          <Route path='/posts'  element={<Feed navigate={ useNavigate() }/>}/>
          <Route path='/login'  element={<LoginForm  navigate={ useNavigate() } assignToken={ setToken }/>}/>
          <Route path='/signup' element={<SignUpForm navigate={ useNavigate() } />}/>
        </Routes>
      </>
    );
}

export default App;
