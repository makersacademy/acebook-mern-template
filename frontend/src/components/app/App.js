import './App.css';
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../user/SignUpForm'
import React, { useState } from 'react';
import Feed from '../feed/Feed'
import PostForm from '../create/PostForm'
import Footer from '../footer/footer'

import {
  useNavigate,
  Routes,
  Route,
} from "react-router-dom";


const App = () => {
  
    return (
      <div className="App">

        <Routes>
          <Route path='/posts'  element={<Feed navigate={ useNavigate() }/>}/>
          <Route path='/login'  element={<LoginForm  navigate={ useNavigate() }/>}/>
          <Route path='/signup' element={<SignUpForm navigate={ useNavigate() }/>}/>
          <Route path='/createpost' element={<PostForm navigate={ useNavigate() }/>}/> 
        </Routes>
      
           <Footer/>
       </div>
    );
}


export default App;
