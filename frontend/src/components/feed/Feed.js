import React, { useEffect, useState } from 'react';
import Post from '../post/Post';
import CreatePost from '../createPost/CreatePost';
import './Feed.css';

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [updated, setUpdated] = useState(null)
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
          setToken(window.localStorage.getItem("token"))
          setUpdated(false)
          setPosts(data.posts);
        })
    }
  }, [updated])
  
    if(token) {
      return(
        <>
          <CreatePost setUpdated={setUpdated}/>
            <div id='feed' role="feed">
              {posts.sort(function(postA, postB) {
                return (new Date(postB.createdAt) - new Date(postA.createdAt));
              }).map(
                (post) => ( <Post post={ post } key={ post._id } /> )
              )}
          </div>
        </>
      )
    } else {
      navigate('/signin')
    }
}

export default Feed;

