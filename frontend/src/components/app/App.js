import './App.css';
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../user/SignUpForm'
import PostId from '../post/post_id'
import NewPostForm from '../post/NewPostForm'
import React, { useState } from 'react';
import Feed from '../feed/Feed'
import UserInfo from '../userInfo/userInfo';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  useNavigate,
  Routes,
  Route,
} from "react-router-dom";

const App = () => {
    return (
        <Routes>
          <Route path="/users/:userId" element={<UserInfo />}/>
          <Route path='/posts'  element={<Feed navigate={ useNavigate() }/>}/>
          <Route path='/login'  element={<LoginForm  navigate={ useNavigate() }/>}/>
          <Route path='/signup' element={<SignUpForm navigate={ useNavigate() }/>}/>
          <Route path= '/posts/:id' element={ <PostId/>}/>
          <Route path='/createpost' element={<NewPostForm navigate={ useNavigate() }/>}/>
        </Routes>
    );
}

export default App;
