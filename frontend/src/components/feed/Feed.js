import React, { useEffect, useState } from 'react';
import Post from '../post/Post';
import './Feed.css';

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  useEffect(() => {
    if(token) {
      fetch("/posts", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(async data => {
          window.localStorage.setItem("token", data.token)
          setToken(window.localStorage.getItem("token"));
          setPosts(data.posts);
        })
    }
  }, [])

  const logout = () => {
    window.localStorage.removeItem("token")
    navigate('/login')
  }

  const createpost = () => {
    navigate('/createpost')
  }

  if(token) {
    return(
      <div className="feed-container">
        <h2 className="feed-heading">Posts</h2>
        <div id='feed' role="feed">
          {posts?.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)).map(
            (post) => ( <Post post={ post } key={ post._id } /> )
          )}
        </div>
        <div className="button-container">
          <button className="logout-button" onClick={logout}>
            Logout
          </button>
          <button className="create-post-button" onClick={createpost}>
            Create Post
          </button>
        </div>
      </div>
    )
  } else {
    navigate('/signin')
  }
}

export default Feed;
