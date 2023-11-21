import React, { useEffect, useState } from 'react';
import Post from '../post/Post'
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
        .then(async data => {
          window.localStorage.setItem("token", data.token)
          setToken(window.localStorage.getItem("token"))

          setPosts(data.posts);
        })

    } // TODO redirect to login page if token exists
  }, [token])


  const logout = () => {
    window.localStorage.removeItem("token")
    navigate('/login')
  }
  
    if(token) {
      return(
        <div className='container'>
          <h2>Posts</h2>
            <button onClick={logout}>
              Logout
            </button>
          <div id='feed' role="feed">
              {posts
              .slice()
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((post) => (
                  <article key={ post._id }><Post post={ post } /></article> )
              )}
          </div>
        </div>
      )
    } else {
      navigate('/login')
    }
}

export default Feed;
