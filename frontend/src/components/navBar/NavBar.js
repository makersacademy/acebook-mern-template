import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  const urlTo = (path) => {
    navigate(path);
  };

  const logout = () => {
    window.localStorage.removeItem("token")
    navigate('/login')
  }

  return(
    <nav data-cy="navbar">
      <h2 id="header">Acebook</h2>
      <button data-cy="home-button" onClick={() => urlTo('/posts')}>Home</button>
      <button data-cy="profile-button" onClick={() => urlTo('/profile')}>Profile</button>
      <button data-cy="search-button" onClick={() => urlTo('/search')}>Search</button>
      {/* <button data-cy="logout-button" onClick={() => urlTo('/login')}>Log Out</button> */}
      <button data-cy="logout-button" onClick={logout}>Logout</button>

    </nav>
  )
}

export default NavBar;
