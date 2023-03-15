import './App.css';
import LoginForm from '../login/LoginForm'
import SignUpForm from '../user/SignUpForm'
import Homepage from '../homepage/Homepage'
import Upload from '../user/UploadProfilePic';
import React, { useState, useContext, useEffect, createContext } from 'react';
import {
  useNavigate,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from '../navbar/Navbar';
import { UserContext } from '../../context/UserContext';
import CreatePost from '../CreatePost/CreatePost';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css'
import ForgottenPassword from '../forgottenPassword/forgottenPassword';


const App = () => {
  const { handleUserInfo, userInfo } = useContext(UserContext)

  // Token is declared here because it is needed in multiple components
  // setToken is passed into the login component so that token can be changed when the user signs in
  // Token is also needed in the navbar component for conditional rendering
  
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  useEffect(() => {
    handleUserInfo(window.localStorage.getItem("userInfo"))
  }, [])

  const logout = () => {
      setToken('');
      window.localStorage.removeItem("token")
      window.localStorage.removeItem("userInfo")
      handleUserInfo(null)
    }

    console.log("user context is: ", UserContext)
    console.log("user info is: ", userInfo)

    return (
      <>
          <Navbar logoutHandle={logout} token={token}/>
          <Routes>
            <Route path='/'  element={<Homepage navigate={ useNavigate() }/>}/>
            <Route path='/testupload' element={<Upload navigate={ useNavigate() }/>}/>
            <Route path='/login'  element={<LoginForm  navigate={ useNavigate() } setToken={setToken}/>}/>
            <Route path='/signup' element={<SignUpForm navigate={ useNavigate() }/>}/>
            <Route path='/forgot-password' element={<ForgottenPassword navigate={ useNavigate() } setToken={setToken}/>}/>
          </Routes>
      </>
    );
}

export default App;
