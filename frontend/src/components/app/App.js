import './App.css';
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../user/SignUpForm'
import NewPostForm from '../post_create/NewPostForm';
import React, { useState } from 'react';
import Feed from '../feed/Feed';
import Navbar  from '../navbar/navbar';
import {
  useNavigate,
  Routes,
  Route,
} from "react-router-dom";

const App = () => {

  // Routes for each page of the website
  return (
        <Routes>
          <Route path='/posts'  element={<Feed navigate={ useNavigate() }/>}/>
          <Route path='/login'  element={<LoginForm  navigate={ useNavigate() }/>}/>
          <Route path='/signup' element={<SignUpForm navigate={ useNavigate() }/>}/>
          <Route path='/navigate' element={<Navbar navigate={ useNavigate() }/>}/>
          <Route path='/new_post' element={<NewPostForm navigate={ useNavigate() }/>}/>
        </Routes>
    );
}

export default App;
