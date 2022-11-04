import React from 'react';
import { Link } from "react-router-dom";
import "./navbar.css";


const navbar= () =>{
  return (
  <body className="navbody">
  <div>
    
      <Link className="signout" to="/login">Sign Out 
      </Link>

      <Link className="signup" to="/Signup">Sign Up
      </Link>

      <Link className="login" to="/login">Sign in
      </Link>
    
  </div>
  </body>
  );
}
export default navbar;