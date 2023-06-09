import React, { useEffect, useState } from 'react';
import Post from '../post/Post';
import PostCreateForm from '../post/PostCreateForm';
import jwt_decode from "jwt-decode";
import Navbar from '../navbar/Navbar';
import './Feed.css';

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
          // jwt_decode decodes the data without accessing the secret key, therefore there are no security issues currently present
          // This line is equivalent to putting the token into jwt.io debugger
          setUserId(jwt_decode(token).user_id)
          setPosts(data.posts);
        })
      }
    }, [])
    
    if(token) {
      return(
        <>
          <Navbar navigate={navigate}/>
          <div className='posts'>
            <h2>Posts</h2>
            <PostCreateForm />
            <div id='feed' role="feed">
              {posts.map(
                (post) => ( <Post post={ post } key={ post._id } userId={ userId } /> )
              )}
            </div>
          </div>
        </>
      )
    } else {
      // TODO: Possibly an error in route. (Might change to /signup?)
      navigate('/login')
    }
}

export default Feed;