import './App.css';
import LoginForm from '../auth/LoginForm';
import SignUpForm from '../user/SignUpForm';
import React from 'react';
import Feed from '../feed/Feed'
import Footer from '../footer/Footer';
import {
  useNavigate,
  Routes,
  Route,
} from "react-router-dom";

const App = () => {
    return (
      <>
        <Routes>
          <Route path='/posts'  element={<Feed navigate={ useNavigate() }/>}/>
          <Route path='/login'  element={<LoginForm  navigate={ useNavigate() }/>}/>
          <Route path='/signup' element={<SignUpForm navigate={ useNavigate() }/>}/>
        </Routes>
        <Footer />
      </>
    );
}

export default App;
