import './App.css';
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../user/SignUpForm'
import ProtectedRoute from '../protectedRoute/ProtectedRoute'
import React, { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Feed from '../feed/Feed'
import {
  useNavigate,
  Routes,
  Route,
} from "react-router-dom";
import {AuthenticationContext} from '../authenticationProvider/AuthenticationProvider';

const App = () => {
  const {isLoggedIn, setIsLoggedIn, username, setUsername, token, setToken} = useContext(AuthenticationContext)
  return (
    <div>    
      <div className="container">
        <nav className="navbar">
          <div className="navbar-brand">Welcome To Acebook</div>
          <ul className="navbar-nav">
            {isLoggedIn ? 
              <>
                <li>Hello {username}</li>
                <li><Link to="/login" onClick={() => {setIsLoggedIn(false); setUsername(""); setToken("")}}>logout</Link> </li>
              </> : 
              <>
                <li><Link to="/signup">Sign Up</Link></li>
                <li><Link to="/login">Login</Link></li>
              </>
            }
          </ul>
        </nav>
      </div>
      <Routes>
        <Route path='/posts'  element={
          <ProtectedRoute>
            <Feed navigate={ useNavigate() }/>
          </ProtectedRoute>
        }/>
        <Route path='/login'  element={<LoginForm  navigate={ useNavigate() }/>}/>
        <Route path='/signup' element={<SignUpForm navigate={ useNavigate() }/>}/>
        <Route path='*' element={<Navigate to='/login' />} />
      </Routes>
    </div>
  );
}

export default App;
