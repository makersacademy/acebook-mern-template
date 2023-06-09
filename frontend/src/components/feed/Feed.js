import React, { useEffect, useState } from 'react';
import Post from '../post/Post';
import PostCreateForm from '../post/PostCreateForm';
import Navbar from '../navbar/Navbar';

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token")); // Retrieves a token from the browser storage

  useEffect(() => {
    // Will send a fetch request if a valid token is found
    if(token) {
      fetch("/posts", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      // This .json() turns a json response into a JS object
        .then(response => response.json())
        .then(async data => {
          window.localStorage.setItem("token", data.token)
          setToken(window.localStorage.getItem("token"))
          setPosts(data.posts);
        })
    }
  }, [])
    
  
    if(token) {
      return(
        <>
          <Navbar />
          <h2>Posts</h2>
          <PostCreateForm />
          <div id='feed' role="feed">
            {posts.map(
              (post) => ( <Post post={ post } key={ post._id } /> )
            )}
          </div>
        </>
      )
    } else {
      // TODO: Possibly an error in route. (Might change to /signup?)
      navigate('/signin')
    }
}

export default Feed;