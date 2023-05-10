import React, { useEffect, useState } from 'react';
import Post from '../post/Post'

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [newPost, setNewPost] = useState('');

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

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch("/posts", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ message: newPost })
      });
  
      const data = await response.json();
  
      setPosts([{ ...data.post, _id: data.post._id}, ...posts]);
      setNewPost('');
  
    } catch (error) {
      console.error(error);
    }
  };
  
  if(token) {
    return(
      <>
        <h2>Posts</h2>
        <button onClick={logout}>Logout</button>

        <form onSubmit={handleSubmit}>
          <label>
            New Post:
            <input id="postText" type="text" value={newPost} onChange={(event) => setNewPost(event.target.value)} />
          </label>
          <button id="post" type="submit">Post</button>
        </form>
        <div id='feed' role="feed">
            {posts.map(
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