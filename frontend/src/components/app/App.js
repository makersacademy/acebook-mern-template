import './App.css';
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../user/SignUpForm'
import NewPostForm from '../post_create/NewPostForm';
import React, { useEffect, useState } from 'react';
import Feed from '../feed/Feed'
import {
  useNavigate,
  Routes,
  Route,
} from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = window.localStorage.getItem('token');
    const currentPath = window.location.pathname;

    if (currentPath !== '/signup' && currentPath !== '/login') {
      if (token) {
        fetch('/verifyToken', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
          .then(response => response.json())
          .then(data => {
            if (!data.valid) {
              navigate('/login');
            }
          });
      } else {
        navigate('/login');
      }
    }
  }, []);

  // Routes for each page of the website
  return (
    <Routes>
      <Route path='/' element={<LoginForm navigate={useNavigate()} />} />
      <Route path='/posts' element={<Feed navigate={useNavigate()} />} />
      <Route path='/login' element={<LoginForm navigate={useNavigate()} />} />
      <Route path='/signup' element={<SignUpForm navigate={useNavigate()} />} />
      <Route path='/new_post' element={<NewPostForm navigate={useNavigate()} />} />
    </Routes>
  );
}

export default App;
