import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../navBar/NavBar';
import defaultProfile from '../../assets/defaultProfile.png';
import Post from '../post/Post';

const UserPublicPage = ({ navigate }) => {
  const { userId } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [postsList, setPostsList] = useState(null);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      // Get user info
      fetch(`/users/user?id=${userId}`, {
        headers: { 
          'Authorization': `Bearer ${token}` 
      }
      })
      .then(res => res.json())
      .then(async data => {
        window.localStorage.setItem("token", data.token);
        setToken(window.localStorage.getItem("token"));
        setUserInfo(data.user);
      })
      .catch(err => console.error(err));
      // Get posts info (simultaneously)
      fetch(`/posts/user/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(async data => {
        window.localStorage.setItem("token", data.token);
        setToken(window.localStorage.getItem("token"));
        setPostsList(data.posts);
      })
      .catch(err => console.error(err));
    } else {
      navigate('/login');
    }
  }, [token, navigate, userInfo, postsList, userId]);

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
        <div className="posts">
          {
            postsList ?
            postsList
            .slice()
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((post) =>
              (<Post post={ post } key={ post._id }/>)
            )
            : "Loading posts..."
          }
        </div>
      </div>
    </>
  )
}

export default UserPublicPage;
