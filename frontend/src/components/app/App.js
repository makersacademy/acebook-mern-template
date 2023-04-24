import './App.css';
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../user/SignUpForm'
import React, { useState, useEffect, createContext, useReducer, useContext } from 'react';
import Feed from '../feed/Feed'
import HomePage from '../home/Home'
import Profile from '../profile/Profile'
import {
  useNavigate,
  Routes,
  Route,
} from "react-router-dom";

const App = () => {
    return (
        <Routes>
          <Route path='/' element={<HomePage navigate={ useNavigate() }/>}/>
          <Route path='/posts'  element={<Feed navigate={ useNavigate() }/>}/>
          <Route path='/profile'  element={<Profile navigate={ useNavigate() }/>}/>
          <Route path='/login'  element={<LoginForm  navigate={ useNavigate() }/>}/>
          <Route path='/signup' element={<SignUpForm navigate={ useNavigate() }/>}/>
          
        </Routes>
    );
}

export default App;

//API: JWT_SECRET=SUPER_SECRET npm run start:test
//FRONTEND: JWT_SECRET=SUPER_SECRET npm run start