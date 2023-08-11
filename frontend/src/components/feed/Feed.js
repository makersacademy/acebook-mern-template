import React, { useEffect, useState } from 'react';
import Post from '../post/Post'
import NavigationBar from '../navigation/Navigation';
import './Feed.css'


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
        .then( async data => {
          window.localStorage.setItem("token", data.token)
          setToken(window.localStorage.getItem("token"))
          setPosts(data.posts);
        })
    }
  }, [])
    

  const logout = () => {
    window.localStorage.removeItem("token")
    navigate('/login')
  }

  const createNewPost = () => {
    navigate('/createPost')
  }
  
    if(token) {
      return(
        <>
          <NavigationBar />
          <div className='feed-container'>
          <h2 className='heading'>Posts</h2>
          <button id='createNewPost' onClick={createNewPost}>
              Create New Post
          </button>
          <div id='feed' role="feed">
              {posts
              .sort((a,b) => { return a._id < b._id ? 1: -1; })
              .map((post) => ( <a href= {`posts/${post._id}`} key={post._id}><Post post={ post } key={ post._id } /></a> ))
              }
          </div>
          </div>
        </>

      )
    } else {
      navigate('/login')
    }

}

export default Feed;
