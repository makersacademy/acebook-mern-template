import React, { useEffect, useState } from 'react';
import './navbar.css';

const Navbar = () => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  
  const logout = () => {
    window.localStorage.removeItem("token")
  }
  
    if(token) {
      return(
        <div class="topnav">
        <a href='/'>Home</a>
        <a href='/posts'>Feed</a>
        <a href='/new_post'>Create a Post</a>
        <a href='/' class="right" onClick={logout}>Log-Out</a>
        </div>
      )
    } else {
      return (
        <div class="topnav">
        <a href='/'>HomePage</a>
        <a href='/posts'>Feed</a>
        <a href='/new_post'>Create a Post</a>
        <a href='/login' class="right" >Login</a>
        </div>
      )
    }}

export default Navbar;