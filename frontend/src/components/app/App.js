import './App.css';
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../user/SignUpForm'
import React from 'react';
import Feed from '../feed/Feed'
import Navbar from "../navbar/Navbar";
import Footer from "../footer/footer";
import Profile from "../profile/profile";
import {
  useNavigate,
  Routes,
  Route,
  useLocation,
  Navigate
} from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = window.localStorage.getItem("user_id");
  
  return (
    <>
      < Navbar navigate={ navigate }/>
        <Routes>
          <Route path='/posts'  element={<Feed navigate={ navigate }/>}/>
          <Route path='/login'  element={!user ? <LoginForm  navigate={ navigate }/> : <Navigate to="/posts"></Navigate>}/>
          <Route path='/signup' element={!user ? <SignUpForm navigate={ navigate }/> : <Navigate to="/posts"></Navigate>}/>
          <Route path='/users/:user_id' element={<Profile navigate={ navigate }/>}/>
        </Routes>
        {location.pathname !== '/login' && location.pathname !== '/signup' && <Footer />}
    </>
  );
}

export default App;