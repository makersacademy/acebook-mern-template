import React, { useEffect, useState } from 'react';
import Post from '../post/Post';
import PostCreateForm from '../post/PostCreateForm';
import jwt_decode from "jwt-decode";

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token")); // Retrieves a token from the browser storage
  const [userId, setUserId] = useState("");

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
          setUserId(jwt_decode(token).user_id)
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
          <h2>Posts</h2>
          <button onClick={logout}>
            Logout
          </button>
          <PostCreateForm />
          <div id='feed' role="feed">
            {posts.map(
              (post) => ( <Post post={ post } key={ post._id } userId={ userId }/> )
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