import './App.css';
import Homepage from '../homepage/Homepage';
import LoginForm from '../auth/LoginForm';
import SignUpForm from '../user/SignUpForm';
import UsernamePage from '../user/UsernamePage';
import CreatePostForm from '../create-post/CreatePostForm';
import UpdatePost from '../update-post/UpdatePost';
import Navbar from '../navbar/navbar';
import React, { useState } from 'react';
import Feed from '../feed/Feed'
import {
  useNavigate,
  Routes,
  Route,
} from "react-router-dom";

const App = () => {
    return (
      <>
        <Navbar navigate={ useNavigate() } />
        <Routes>
          <Route path='/' element={<Homepage navigate={ useNavigate() }/>}/>
          <Route path='/posts'  element={<Feed navigate={ useNavigate() }/>}/>
          <Route path='/login'  element={<LoginForm  navigate={ useNavigate() }/>}/>
          <Route path='/signup' element={<SignUpForm navigate={ useNavigate() }/>}/>
          <Route path='/username' element={<UsernamePage />} /> (// this adds a route to retrieve a username)
          <Route path='/create-post' element={<CreatePostForm navigate={ useNavigate() }/>}/>
          <Route path='/posts/:id/update' element={<UpdatePost navigate={ useNavigate() }/>}/>
        </Routes>
      </>
    );
}

export default App;
