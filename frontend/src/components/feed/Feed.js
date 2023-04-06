import React, { useEffect, useState } from 'react';
import Post from '../post/Post'

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [newPost, setNewPost] = useState("")
  const [likes, setLikes] = useState(0) // to be used for count of like
  const [comments, setComments] = useState(0) // to be used for count of comments

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

  const new_post = async (event) => {
    event.preventDefault();

    fetch( '/posts', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({message: newPost})
    })
    .then(response => {
      if(response.status === 201) {
        navigate('/posts');
        window.location.reload();
      } else {
        throw new Error('Failed to create post');
      }
    })
}

  const handleNewPostChange = (event) => {
    setNewPost(event.target.value);
  }

  
    if(token) {
      return(
        <>
          <h2>Posts</h2>
            <button onClick={logout}>
              Logout
            </button>
            <form>
              <input type='text' id='post' value={newPost} onChange={handleNewPostChange}></input>
              <button onClick={new_post}>Post</button>
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