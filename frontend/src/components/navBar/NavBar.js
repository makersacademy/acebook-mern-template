import React from 'react';
import { useNavigate } from 'react-router-dom';
import Acebook from '../auth/static/Acebook.png';
import './NavBar.css'

const NavBar = () => {
  const navigate = useNavigate();

  const urlTo = (path) => {
    navigate(path);
  };

  // const userId = window.localStorage.getItem('userId');


  const logout = () => {
    window.localStorage.removeItem("token")
    navigate('/login')
  }

  return(
    <div className='navbarcontainer'>
    <nav data-cy="navbar">
      <img  className='logo' src={Acebook} alt="logo" />
      <div className='buttoncontainer'><button className='navbutton' data-cy="home-button" onClick={() => urlTo('/posts')}>Home</button>
      <button className='navbutton' data-cy="profile-button" onClick={() => urlTo('/profile')}>Profile</button>
      {/* <button className='navbutton' data-cy="search-button" onClick={() => urlTo('/search')}>Search</button> */}
      {/* <button data-cy="logout-button" onClick={() => urlTo('/login')}>Log Out</button> */}
      <button className='navbutton' data-cy="logout-button" onClick={logout}>Logout</button>
    </div>
    </nav></div>
  )
}

export default NavBar;
