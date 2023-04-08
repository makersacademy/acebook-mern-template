import React, { useEffect, useState } from 'react';
import Post from '../post/Post'
import PostForm from '../post/PostForm'

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
    }
  }, [])

  const handlePostSubmit = (message) => {
    fetch('/posts', {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({message})
    })
      .then((response) => response.json())
      .then((data) => {
        setPosts([...posts, data.message])
        window.location.reload();
      })
      .catch((error) => console.error(error));
  };
    

  const logout = () => {
    window.localStorage.removeItem("token")
    navigate('/login')
  }
  
    if(token) {
      return(
        <>
          <h2>Posts</h2>
          <PostForm onSubmit={handlePostSubmit} />
            <button onClick={logout}>
              Logout
            </button>
          <div id='feed' role="feed">
              {
              posts.reverse().map(
                (post) => ( <Post post={post} key={ post._id } /> )
              )}
          </div>
        </>
      )
    } else {
      navigate('/login')
    }
}

export default Feed;