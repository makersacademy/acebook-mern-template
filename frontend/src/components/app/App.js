import './App.css';
import LoginForm from '../auth/LoginForm'
import Navbar from '../Navbar/Navbar'
import SignUpForm from '../user/SignUpForm'
import React, { useState } from 'react';
import Feed from '../feed/Feed'
import Profile from '../profile/profile'
import ProfileEditor from '../profileEditor/profileEditor'

import {
  useNavigate,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

const App = ({ navigate }) => {
    return (
      <div>
        <Navbar navigate={ useNavigate() } />
          <div>
            <Routes>
              <Route path='/posts'  element={<Feed navigate={ useNavigate() }/>}/>
              <Route path='/login'  element={<LoginForm  navigate={ useNavigate() }/>}/>
              <Route path='/signup' element={<SignUpForm navigate={ useNavigate() }/>}/>
              <Route path='/users/:userId' element={<Profile navigate={ useNavigate() }/>} />
              <Route path='/profileEditor' element={<ProfileEditor navigate={ useNavigate() }/>} />
            </Routes>
          </div>
      </div>
    );
}

export default App;
