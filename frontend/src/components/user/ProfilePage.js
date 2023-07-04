import React, { useState } from 'react';

  function Profile(){
    const bannerUrl = "https://venngage-wordpress.s3.amazonaws.com/uploads/2018/10/28.-Screen-Shot-2018-09-27-at-8.23.58-AM.png";
    const pictureUrl = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    return (
    <div>
      <h2>Profile</h2>
      <div className="banner">
        <img src={bannerUrl} alt="Banner" />
        <div className="banner-content">
          <h1>aGuideHub</h1>
          <p>Welcome To aGuideHub!</p>
        </div>
      </div>
      
      <div className="profile-picture-container">
        <img src={pictureUrl} alt ="profile" />
        <h1>ProfilePicture</h1>
      </div>

      <div className="userData">
        
      </div>
    </div>


  );

  return (
    <div className="container">
      <div className="profile-picture-container">
        {/* Add profile picture component or image here */}
      </div>
      <div className="profile-container">
        <div className="banner">
          <img src={bannerUrl} alt="Banner" />
          <div className="banner-content">
            <h2>Profile</h2>
            <h1>aGuideHub</h1>
            <p>Welcome To aGuideHub!</p>
          </div>
        </div>
        <div className="userData">
          {/* Add user data content here */}
        </div>
      </div>
    </div>
  );
  
}


export default Profile;
