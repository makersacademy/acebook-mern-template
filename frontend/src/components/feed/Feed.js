import React, { useEffect, useState } from 'react';
import Post from '../post/Post'

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [newPost, setNewPost] = useState("")

  useEffect(() => {
    if(token) {
      fetchPosts();
    } else {
      navigate('/login')
    }
  }, [])
  
  const fetchPosts = async () => {
      const response = await fetch("/posts", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json();
      window.localStorage.setItem("token", data.token);
      setToken(window.localStorage.getItem("token"));
      setPosts(data.posts);
  }

  const saveNewPost = async () => {
    return await fetch( '/posts', {
      method: 'post',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        newPost: newPost
      })
    })
  }
  
  //posting a new post
  const handleSubmitPost = async (event) => {
    event.preventDefault();
    
    if(token) {
      const response = await saveNewPost();
      if(response.status === 201) {
        setNewPost("")
        fetchPosts();
      }
    } else {
      navigate('./login')
    }
  }
  
  const handlePostChange = (event) => {
    setNewPost(event.target.value)
  }

  const logout = () => {
    window.localStorage.removeItem("token")
    navigate('/login')
  }
  
  if(token) {
    return(
      <>
        <h2>Posts</h2>
        
        <button onClick={ logout }>Logout</button>

        <form onSubmit={handleSubmitPost}>
          <input placeholder="post" id="post" type='text' value={ newPost } onChange={handlePostChange} />
          <input id='submit' type="submit" value="Submit" />
        </form>

        <div id='feed' role="feed">
          {
            posts.slice().reverse().map((post) => {
              return <Post post={ post }/>
            })
          }
        </div>
      </>
    )
  }
}

export default Feed;