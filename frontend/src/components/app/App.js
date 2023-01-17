import './App.css';
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../user/SignUpForm'
import React, { useState } from 'react';
import Feed from '../feed/Feed'
import Navbar from "../navbar/Navbar";
import Footer from "../footer/footer";

import {
  useNavigate,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { useEffect } from 'react';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // below is beginnings of preventing
  // access to /login and /signup when currently logged in
  // will use useLocation

  // useEffect(() => {
  //   if (window.localStorage.getItem("token")) {
  //     navigate('/posts');
  //   }
  // }, [navigate]);

  return (
    <>
      < Navbar navigate={ navigate }/>
        <Routes>
          <Route path='/posts'  element={<Feed navigate={ navigate }/>}/>
          <Route path='/login'  element={<LoginForm  navigate={ navigate }/>}/>
          <Route path='/signup' element={<SignUpForm navigate={ navigate }/>}/>
        </Routes>
        {location.pathname !== '/login' && location.pathname !== '/signup' && <Footer />}
    </>
  );
}

export default App;
