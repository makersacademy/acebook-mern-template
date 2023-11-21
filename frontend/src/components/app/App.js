import "./App.css";
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../user/SignUpForm";
import UserProfileFeed from '../userProfile/UserProfileFeed';
import HomePage from '../homepage/HomePage'
import React, { useState } from "react";
import Feed from "../feed/Feed";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import AvatarChoiceForm from "../user/AvatarChoiceForm";
import Navbar from "../navbar/Navbar";
import UserAccount from "../user/UserAccount";
import Header from "../user/header/Header";

const App = () => {
    return (
      <div className="App">
        <Navbar navigate={ useNavigate() } />
        <Routes>
          <Route path='/posts'  element={<Feed navigate={ useNavigate() }/>}/>
          <Route path='/login'  element={<LoginForm  navigate={ useNavigate() }/>}/>
          <Route path='/signup' element={<SignUpForm navigate={ useNavigate() }/>}/>
          {/* choose-avatar route uses useLocation hook to retrieve user email from signup page */}
          <Route
            path="/choose-avatar"
            element={<AvatarChoiceForm location={useLocation()} navigate={useNavigate()} />}
          />
          <Route path='/users/my_account' element={<UserAccount navigate={ useNavigate() }/>}/>
          <Route path='/users/data/:user_id' element={<Header navigate={ useNavigate() }/>}/>
          <Route path='/users/profile/:user_id' element={<UserProfileFeed navigate={ useNavigate() }/>}/>
          
          <Route path='/'  element={<HomePage navigate={ useNavigate() }/>}/>

        </Routes>
      </div>
    );
  }

export default App;
