 import './nav_bar.css'
 import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';




const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    window.localStorage.removeItem("token");
    navigate('/login');
  };
  
  const handleLoginClick = () => {
   navigate('login')
  }
  const handleSignupClick = () => {
   navigate('/signup')
  }

  const [isOpen, setIsOpen] = useState(false);
  const handleDropdownClick = () => setIsOpen(!isOpen);
  const token = window.localStorage.getItem('token');
  const isLoginPage = location.pathname === '/login';
  const isSignupPage = location.pathname === '/signup';


  return ( 
   <>
   { token ? (
   <div className="dropdown">
      <div className='dropdown-container'>
     <button className="dropdown-button" onClick={handleDropdownClick}>
       Dropdown
     </button>
     </div>
     {isOpen && (
       <div className="dropdown-content">
         <button className="dropdown-item">Profile Settings</button>
         <div>
           <button onClick={logout}>Logout</button>
         </div>
       </div>
     )}
   </div>
 ) : (
   <>
   <div className='login-signup'>
   {isLoginPage && <button className='signUpNav' onClick={handleSignupClick}>Sign up page</button>}
   {isSignupPage && <button className='loginNav' onClick={handleLoginClick}>Login page</button>}
   </div>
   </>
 )
   }
   </>
  )
};
  export default Navigation;

 
