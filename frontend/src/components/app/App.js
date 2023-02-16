import './App.css';
import LoginForm from '../auth/LoginForm';
import SignUpForm from '../user/SignUpForm';
import React, { useState, useEffect } from 'react';
import Feed from '../feed/Feed';
import Home from '../home/Home';
import Navbar from '../navbar/Navbar';
import { useNavigate, Routes, Route } from 'react-router-dom';
import Profile from '../profile/Profile';
import Account from '../account/account';
import TimeAgo from 'javascript-time-ago';
import Posts from '../posts/Posts';

import en from 'javascript-time-ago/locale/en.json';

TimeAgo.addDefaultLocale(en);
const App = () => {
  const [token, setToken] = useState(window.localStorage.getItem('token'));

  return (
    <div className='app-container'>
      <Navbar navigate={useNavigate} token={token} setToken={setToken} />
      <Routes>
        <Route path='/' element={<Home navigate={useNavigate()} />} />
        <Route path='/account' element={<Account navigate={useNavigate()} />} />
        <Route path='/posts' element={<Posts navigate={useNavigate()} />} />
        <Route
          path='/login'
          element={<LoginForm navigate={useNavigate()} token={setToken} />}
        />
        <Route
          path='/signup'
          element={<SignUpForm navigate={useNavigate()} />}
        />
        <Route path='/profile' element={<Profile navigate={useNavigate()} />} />
      </Routes>
    </div>
  );
};

export default App;
