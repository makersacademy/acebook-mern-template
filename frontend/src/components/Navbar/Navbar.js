import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "./navbar.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

const elementSignOut = <FontAwesomeIcon icon={ faRightFromBracket } />

const Navbar= () =>{

  const handleLogout = () => {
    window.localStorage.removeItem("token")
  }
  
  return (
    <>
      <div className='navbar-top'>
        <a className='navbar-home' href="/posts" >spybook &#129464;</a>
        <a onClick={ handleLogout } className='navbar-signout' href="/" >Sign Out { elementSignOut }</a>
      </div>

      <div className='navbar-bottom'>
        <p> © 2022 The Incredibles &#128156;</p>
      </div>
    </>
  )
}

export default Navbar;