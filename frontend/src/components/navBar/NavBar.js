import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };

  return(
    <nav data-cy="navbar">
      <h2 data-cy="header">Acebook</h2>
      <button data-cy="home-button" onClick={() => navigateTo('/feed')}>Home</button>
      <button data-cy="profile-button" onClick={() => navigateTo('/profile')}>Profile</button>
      <button data-cy="search-button" onClick={() => navigateTo('/search')}>Search</button>
      <button data-cy="logout-button" onClick={() => navigateTo('/login')}>Log Out</button>

    </nav>

// <nav data-cy="navbar">
// <div className="nav-left">
//   <button data-cy="home-button" onClick={() => navigateTo('/feed')}>Home</button>
// </div>
// <div className="nav-center">
//   <h2 data-cy="header">Acebook</h2>
// </div>
// <div className="nav-right">
//   <button data-cy="profile-button" onClick={() => navigateTo('/profile')}>Profile</button>
//   <button data-cy="search-button" onClick={() => navigateTo('/search')}>Search</button>
//   <button data-cy="logout-button" onClick={() => navigateTo('/login')}>Log Out</button>
// </div>
// </nav>

  )
}

export default NavBar;
