import React, { useEffect, useState } from 'react';
import Post from '../post/Post'
// import User from '../user/User'
import Feed from '../feed/Feed'
import NavBar from '../navBar/NavBar'
import defaultProfile from '../../assets/defaultProfile.png';

// Some logic required: If you're landing on your own profile, you see the update image. If you're landing on another person's profile, you don't. 
// But do you see follow/unfollow instead? 


// const Profile = ({ navigate, currentUserId, profileOwnerId }) => {
//     const isOwnProfile = currentUserId === profileOwnerId;

const Profile = ({ navigate }) => {

      return(
        <>
        <NavBar/>
        <h2>Profile Name</h2>
        <div>
        <img src={defaultProfile} alt="Default Profile Image"/>
        </div>
        
        {/* {isOwnProfile && (
        <button>Update Profile Image</button>
      )}
       */}
        <button>Update Profile Image</button>

        {/* <h3>Post & Number</h3>
        <h3>Followers & Number</h3>
        <h3>Following & Number</h3> */}
        <Feed navigate={navigate}/>
        </>
      )
}

export default Profile;
