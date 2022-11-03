import React, { useEffect, useState } from 'react';
import Post from '../post/Post'
import Kyle from '../kyle/Kyle'
import "./Feed.css";

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = () => {
    if (token) {
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
  }

  const handleSubmitPost = async (event) => {
    event.preventDefault();

    if (message === '') return
    let response = await fetch('/posts', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ message: message }),
    })
    console.log("submit")

    if (response.status !== 201) {
      navigate('/posts')
    } else {
      let data = await response.json()
      window.localStorage.setItem("token", data.token)
      fetchPosts()
      setMessage("")
    }
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const logout = () => {
    window.localStorage.removeItem("token")
    navigate('/login')
  }

  if (token) {
    return (
      <>
        <h2>Posts</h2>
        <button id='logout-button' onClick={logout}>
          Logout
        </button>
        <div id="message-box">
          <form onSubmit={handleSubmitPost}>
            <label>
              Post a message:
              <textarea placeholder="Message" id="message" value={message} onChange={handleMessageChange} />
            </label>
            <input id='submit' type="submit" value="Submit" />
          </form>
        </div>
        <div id='feed' role="feed">
          {posts.map(
            (post) => (<Post post={post} key={post._id} />)
          ).reverse()}
        </div>
        <Kyle />
      </>
    )
  } else {
    navigate('/login')
  }
}

export default Feed;
