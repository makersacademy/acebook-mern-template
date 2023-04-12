import React from 'react';
import './UserBanner.css'

const UserBanner = ({ userData }) => {
  
  return (
    <>
      <div id='inner-banner-container'> 
        <div id="user-banner-img">
          <img src={ userData.avatar }></img>
        </div>
        <div id="user-banner-info">
          <h2>{ userData.username }</h2>
          <p>{ userData.email }</p>
        </div>
      </div>
    </>
  );
}

export default UserBanner;