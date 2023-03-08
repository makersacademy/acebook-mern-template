import './App.css';
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../user/SignUpForm'
import Homepage from '../homepage/Homepage'
import React, { useState } from 'react';
import Feed from '../feed/Feed'
import {
  useNavigate,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from '../navbar/Navbar';

const App = () => {

  // Token is declared here because it is needed in multiple components
  // setToken is passed into the login component so that token can be changed when the user signs in
  // Token is also needed in the navbar component for conditional rendering
  
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const logout = () => {
      setToken('');
      window.localStorage.removeItem("token")
    }

    return (
      <>
        <Navbar logoutHandle={logout} token={token}/>
        <Routes>
          <Route path='/'  element={<Homepage navigate={ useNavigate() }/>}/>
          <Route path='/posts'  element={<Feed navigate={ useNavigate() }/>}/>
          <Route path='/login'  element={<LoginForm  navigate={ useNavigate() } setToken={setToken}/>}/>
          <Route path='/signup' element={<SignUpForm navigate={ useNavigate() }/>}/>
        </Routes>
      </>
    );
}

export default App;
