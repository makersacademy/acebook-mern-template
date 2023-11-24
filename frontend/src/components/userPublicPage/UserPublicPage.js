import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../navBar/NavBar';
import defaultProfile from '../../assets/defaultProfile.png';
import './UserPublicPage.css'
import ChronologicalPosts from '../chronologicalPosts/ChronologicalPosts';

const UserPublicPage = ({ navigate }) => {
  const { userId } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [postsList, setPostsList] = useState(null);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  useEffect(() => {
    if (userInfo && postsList) {
      return;
    }
    if (token) {
      // Get user info
      fetch(`/users/${userId}`, {
        headers: { 
          'Authorization': `Bearer ${token}` 
      }
      })
      .then(res => res.json())
      .then(async data => {
        //window.localStorage.setItem("token", data.token);
        //setToken(window.localStorage.getItem("token"));
        setUserInfo(data.user);
      })
      .then(() => {
        // Afterwards; get posts list
        fetch(`/posts/user/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(res => res.json())
        .then(async data => {
          //window.localStorage.setItem("token", data.token);
          //setToken(window.localStorage.getItem("token"));
          console.log("Printing what will be written to postsList");
          console.log(data.posts);
          setPostsList(data.posts);
        })
        .catch(err => console.error(err));
      })
      .catch(err => console.error(err));

    } else {
      navigate('/login');
    }
  }, [token, navigate, userInfo, postsList, userId]);

  if (!token) {
    navigate('/login');
  }
  return(
    <>
      <NavBar/>
      <div className="public-page-container">
        <h2>
          {
            userInfo ?
            `Posts by ${userInfo.displayName}` :
            "Loading page..."
          }
        </h2>
        <div className="profile-picture">
          <img src={defaultProfile} alt="Default Profile"/>
        </div>
        {/* <div className="posts">
          {
            postsList ?
            (postsList
            .slice()
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((post) =>
              (<Post post={ post } key={ post._id }/>)
            ))
            : <h2>Loading posts...</h2>
          }
        </div> */}
        {
          postsList ?
          <ChronologicalPosts posts={ postsList }/>
          : <h2>Loading posts...</h2>
        }
      </div>
    </>
  )
}

export default UserPublicPage;
