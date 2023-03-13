import React from "react";
import "./navbar.css"

export default function Navbar() {
    const isLoggedIn = window.localStorage.getItem("token");

    const logOut = () =>{
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('user_id');
    }
    
    if (isLoggedIn) {
        return (
            <nav className="navigation">
                <a href="/" className="brand-name">
                </a>
                
                <div className="navigation-menu">
                    <li>
                        <a href = "/" onClick={logOut} >Log Out</a>
                    </li>
                    
                </div>
            </nav>
        );
    }
    else{
        return (
            <nav className="navigation">
              <a href="/" className="brand-name">
              </a>
              
              <div
                className="navigation-menu">
                <ul>
                  <li>
                    <a href="/signup">Sign Up</a>
                  </li>
                  <li>
                    <a href="/login">Login</a>
                  </li>
                </ul>
              </div>
            </nav>
          );
    }
}