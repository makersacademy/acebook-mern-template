import React, { useEffect, useState } from 'react';

import Post from '../post/Post'
import './Feed.css';

import PostForm from '../post/PostForm';

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [form, setForm] = useState(false);

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
          setPosts(data.posts);
        })
    }
  }, [])
    

  const logout = () => {
    window.localStorage.removeItem("token")
    navigate('/login')
  }
  
    if(token) {
      return(

        <>
          <h2 className='h2'>Posts</h2>
            <button className='deleteButton' onClick={() => setForm(!form) }>Add Post</button>
                      {form && <PostForm />}
            <button className='deleteButton' onClick={logout}>

              Logout
            </button>
          <div id='feed' role="feed">
              {posts.map(
                (post) => ( <Post post={ post } key={ post._id } /> )
              )}
          </div>
        </>
      )
    } else {
      navigate('/login')
    }
}

export default Feed;