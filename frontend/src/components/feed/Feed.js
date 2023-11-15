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
          
          // Remove line below once backend for posts is set up
          data.posts = [
            {
              'id': 1,
              'content': 'This is my first post',
              'created_at': '13-10-23',
              'number_of_likes': 20,
              'author': 1,
              'comments': ['great post', 'interesting']
            },
            {
              'id': 1,
              'content': 'This is my second post',
              'created_at': '13-10-23',
              'number_of_likes': 10,
              'author': 1,
              'comments': ['great post', 'interesting']
            }
          ]
          setPosts(data.posts);
        })
    }
    else {
      navigate('/login')}
  }, [])
    

  const logout = () => {
    window.localStorage.removeItem("token")
    navigate('/login')
  }
  
    if(token) {
      return(
        <>
          <h2>Posts</h2>
          <div id='feed' role="feed">
              {posts.map(
                (post) => ( <Post post={ post } key={ post._id } /> )
              )}
          </div>
          <button onClick={logout}>
              Logout
          </button>
        </>
      )
    } else {
      navigate('/login')
    }
}

export default Feed;
