import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './nav.css'

const NavBar = ({ navigate }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

    const sendUserTo = () => {
      
    }
 
    return (
      <div className="nav-container">
        <div className="nav-box">
            <div>
                <Link to="/signup">Sign-up</Link>
            </div>
            <div>
                <Link to="/login">Login</Link>
            </div>
            <div>
                <Link to="/posts">Posts</Link>
            </div>
        </div>
      </div>
    );
}

export default NavBar;