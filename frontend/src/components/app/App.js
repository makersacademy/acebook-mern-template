import './App.css';
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../user/SignUpForm'
import PostId from '../post/post_id'
import React, { useState } from 'react';
import Feed from '../feed/Feed'
import {
  useNavigate,
  Routes,
  Route,
} from "react-router-dom";

const App = () => {
    return (
        <Routes>
          <Route path='/posts'  element={<Feed navigate={ useNavigate() }/>}/>
          <Route path='/login'  element={<LoginForm  navigate={ useNavigate() }/>}/>
          <Route path='/signup' element={<SignUpForm navigate={ useNavigate() }/>}/>
          <Route path= '/posts/:id' element={ <PostId/>}/>
        </Routes>
    );
}

export default App;
