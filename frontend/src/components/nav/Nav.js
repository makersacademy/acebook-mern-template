import React, { useEffect, useState } from 'react';
import { BrowserRouter, Link, NavLink } from 'react-router-dom';
import './nav.css'
import NavButton from '../navbutton/NavButton';

const NavBar = ({ navigate }) => {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [authed, setAuthed] = useState(false);
const [token, setToken] = useState(window.localStorage.getItem("token"));

 
  useEffect(() => {
    
  }, [token])

    return (
      <>
      <div className="nav-container">
          {token ? (
          <div className="nav-box">
            <h1>Waffle</h1>
            <NavButton to="/posts" value="Posts"/>

            <NavButton to="/logout" value="Logout"/>
          </div>
          ):(
          <div className="nav-box">
            <h1>Waffle</h1>
            <NavButton to="/signup" value="Sign-up"/>

            <NavButton to="/login" value="Login"/>
          </div>
          )}
      </div>
      </>
    );
}

export default NavBar;