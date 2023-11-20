import React, { useEffect, useState } from 'react';
import NavBar from '../navBar/NavBar'
import defaultProfile from '../../assets/defaultProfile.png';
import ProfileFeed from '../profileFeed/ProfileFeed';
import NewPost from '../newPost/NewPost';


// Some logic required: If you're landing on your own profile, you see the update image. If you're landing on another person's profile, you don't. 
// But do you see follow/unfollow instead? 

// const Profile = ({ navigate, currentUserId, profileOwnerId }) => {
//     const isOwnProfile = currentUserId === profileOwnerId;

const Profile = ({ navigate }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

// NEED TO LOOK AT THIS BELOW!!!

// useEffect(() => {
//   if (token) {
//     fetch("/users", {  // Corrected endpoint
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     })
//     .then(response => response.json())
//     .then(data => {
//       // Assuming the backend sends the new token and user data
//       window.localStorage.setItem("token", data.token);
//       setToken(window.localStorage.getItem("token"));
//       setUser(data.user); // Set the user data
//     })
//     .catch(error => {
//       console.error('Error:', error);
//       // Handle error (e.g., redirect to login)
//     });
//   } else {
//     navigate('/login');
//   }
// }, [token, navigate]);


  // useEffect(() => {
  //   // Function to fetch user data
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await fetch('/user'); // Adjust URL as needed
  //       const userData = await response.json();
  //       setUser(userData); // Assuming setUser is the state setter for user
  //     } catch (error) {
  //       console.error('Error fetching user data:', error);
  //     }
  //   };
  
  //   fetchUserData();
  // }, []);

  // console.log({user})
        return(
        <>
        <NavBar/>
        <h2>Profile Name: {user && user.displayName}</h2>
        <div>
        <img src={defaultProfile} alt="Default Profile Image"/>
        </div>
        
        {/* {isOwnProfile && (
        <button>Update Profile Image</button>
      )}
       */}
        <button>Update Profile Image</button>
        <div>
        <NewPost />

        </div>
        
        {/* <h3>Post & Number</h3>
        <h3>Followers & Number</h3>
        <h3>Following & Number</h3> */}
        <ProfileFeed navigate={navigate}/>
        </>
      )
}

export default Profile;
