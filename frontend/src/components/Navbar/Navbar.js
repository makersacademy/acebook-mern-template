import React from 'react';
import { Link } from "react-router-dom";

const navbar= () =>{
  return (
  <div>
    <li>
      <Link to="/login">Sign Out 
      </Link>

      <Link to="/Signup">Sign Up
      </Link>

      <Link to="/login">Sign in
      </Link>
    </li>
  </div>
  );
}
export default navbar;