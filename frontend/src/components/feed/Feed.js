import React, { useEffect, useState } from 'react';
import Post from '../post/Post'
import axios from 'axios';
import UserBanner from '../userBanner/UserBanner';
import Navbar from '../navbar/Navbar';
import NewPostForm from '../newForm/NewPostForm';

import './Feed.css';

const Feed = ({ navigate }) => {
  const [userData, setUserData] = useState({})
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [newPost, setNewPost] = useState("");
  const [newImg, setNewImg] = useState(null);

  useEffect(() => {
    if(token) {
      fetch("/posts", {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(response => response.json())
        .then(async data => {
          window.localStorage.setItem("token", data.token)
          setToken(window.localStorage.getItem("token"))
          setPosts(data.posts); 
          setUserData(data.user)
        })
        .catch(error => console.log(error));
    }
  }, [token])

  const logout = () => {
    window.localStorage.removeItem("token")
    navigate('/login')
  }

  // ONE METHOD TO SEND THEM ALL XP -

  const handleSubmit = (event) => {
    if (!newPost && !newImg) return
    event.preventDefault();

    const formData = newFormData();
    axios.post('/posts', formData, requestHeaders)
      .then(response => {
        if (response.status === 201) { reloadFeedPage() }
        else { throw new Error('Failed to create post'); }
      })
      .catch(error => console.log(error));
  }

  // HELPER METHODS -----------------

  const newFormData = () => {
    const formData = new FormData();
    formData.append('post', newPost);
    formData.append('img', newImg);
    return formData
  }

  const requestHeaders ={
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  }

  const reloadFeedPage = () => {
    navigate('/posts');
    window.location.reload(); 
  }

  const handleNewPostChange = (event) => {
    setNewPost(event.target.value);
  }

  const handleImg = (event) => {
    setNewImg(event.target.files[0]);
  }

  if(token) {
    return(
      <>
        <Navbar logout={logout} />
        <div id='main-container' >
          <div id="user-banner-container">
            <UserBanner userData={userData} />
            <NewPostForm newPost={ newPost } handleNewPostChange={handleNewPostChange} new_post={new_post}/>
          </div>
          <div id='feed' role="feed">
            {posts.map(
              (post) => (<Post post={ post } key={ post._id } /> )
            )}
          </div>
        </div>     
        {/* <form onSubmit={handleSubmit} encType='multipart/form-data'>
          <input type='text' id='post' value={newPost} onChange={handleNewPostChange} />
          <input type='file' accept=".png, .jpg, .jpeg" id='img' onChange={handleImg} />
          <input type='submit' />
        </form> */}
      </>
    );
  } else {
    navigate('/signin');
    return null;
  }
}

export default Feed;
