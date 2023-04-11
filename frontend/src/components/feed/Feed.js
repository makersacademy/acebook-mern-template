import React, { useEffect, useState } from 'react';
import Post from '../post/Post'
//import PostForm from '../post/PostForm'

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [message, setMessage] = useState("")

  useEffect(() => {
    if(token) {
      fetch("/posts", {
        headers: {

          //makes sure a vaild token is present
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(async data => {
          window.localStorage.setItem("token", data.token)
          setToken(window.localStorage.getItem("token"))

          //gets all posts and puts them in reverse order
          setPosts(data.posts.reverse());
        })
    } 
  }, [])

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  }

  
  // NEW POST -----------------------------
  const handlePostSubmit = (event) => {
    event.preventDefault();
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
        
        //sets posts to all posts + the new post 
        setPosts([...posts, data])
        setMessage('')
        // this refreshes the whole window which is not ideal.
        window.location.reload();
      })
      .catch((error) => console.error(error));
  };

  // LOGOUT --------------------------------
  const logout = () => {
    window.localStorage.removeItem("token")
    navigate('/login')
  }

  // RENDER POSTS ------------------------
  const renderPosts = () => {
    return (
      <div>
        {
          posts.map(
          (post) => ( 
          <Post post={post} key={ post._id } /> )
        )}
      </div>
    )
  }

  // RENDER CREATE POST FORM -----------------
  const renderPostForm = () => {
    return (
      <form onSubmit={handlePostSubmit}>
        <input type="text" name="message" value={message} onChange={handleMessageChange}/>
        <button type="submit">Post</button>
      </form>
    )
  }
  
    if(token) {
      return(
        <>
          <h2>Acebook</h2>
          <button onClick={logout}>Logout</button>
          {renderPostForm()}
          {renderPosts()}
        </>
      )
    } else {
      navigate('/login')
    }
}

export default Feed;