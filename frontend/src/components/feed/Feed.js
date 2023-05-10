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

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/posts", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ message: newPost })
    })
      .then(response => response.json())
      .then(data => {
        // setPosts([{ ...data.post, _id: data.post.id }, ...posts]);
        window.location.reload();
        setNewPost('');
      })
    
  }
  
  if(token) {
    return(
      <>
        <h2>Posts</h2>
        <button onClick={logout}>Logout</button>

        <form onSubmit={handleSubmit}>
          <label>
            New Post:
            <input type="text" value={newPost} onChange={(event) => setNewPost(event.target.value)} />
          </label>
          <button type="submit">Post</button>
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