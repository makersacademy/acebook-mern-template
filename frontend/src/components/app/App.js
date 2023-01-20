import './App.css';
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../user/SignUpForm'
import React from 'react';
import Feed from '../feed/Feed'
import Navbar from "../navbar/Navbar";
import Footer from "../footer/footer";
import Profile from "../profile/profile";
import FriendsPage from '../FriendsPage/FriendsPage';
import {
  useNavigate,
  Routes,
  Route,
  useLocation,
  Navigate
} from "react-router-dom";
import NotFound from '../NotFound/NotFound';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = window.localStorage.getItem("user_id");
  
  return (
    <>
      < Navbar navigate={ navigate }/>
        <Routes>
          <Route path='/'  element={<Feed navigate={ navigate }/>}/>
          <Route path='/posts'  element={<Feed navigate={ navigate }/>}/>
          <Route path='/login'  element={!user ? <LoginForm  navigate={ navigate }/> : <Navigate to="/posts"></Navigate>}/>
          <Route path='/signup' element={!user ? <SignUpForm navigate={ navigate }/> : <Navigate to="/posts"></Navigate>}/>
          <Route path='/users/:user_id' element={<Profile navigate={ navigate }/>}/>
          <Route path='/friends/:user_id' element={<FriendsPage navigate={ navigate }/>}/>
          {/* The below NotFound route must be last as any routes under it will not be rendered */}
          <Route path='/*' element={<NotFound />} />
        </Routes>
        {(location.pathname === '/' || location.pathname === '/posts' || location.pathname === '/users/:user_id') && <Footer />}
    </>
  );
}

export default App;