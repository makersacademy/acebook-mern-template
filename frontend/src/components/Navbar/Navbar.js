import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar= () =>{
  
  // const handleLogout = () => {
  //   window.localStorage.removeItem("token")
  // }
  
  return (
    <div>
      <ul>    
        <li><Link className="signout" to="/login">Sign Out</Link>
        </li>
        <li><Link className="signup" to="/Signup">Sign Up</Link>
        </li>
        <li><Link className="login" to="/login">Sign in</Link>
        </li>
      </ul>
    </div>
  )
}

export default Navbar;