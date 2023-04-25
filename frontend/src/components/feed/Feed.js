import React, { useEffect, useState } from 'react';
import Post from '../post/Post'

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  useEffect(() => {
    if(token) {
      fetch("/api/posts", {
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
          <h2>Posts</h2>
            <button onClick={logout}>
              Logout
            </button>
          <div id='feed' role="feed">
              {posts.map(
                (post) => ( <Post post={ post } key={ post._id } token={token} setToken={setToken}/> )
              )}
          </div>
        </>
      )
    } else {
      navigate('/signup')
    }
}

export default Feed;