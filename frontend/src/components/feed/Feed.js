import React, { useEffect, useState } from 'react';
import Post from '../post/Post';
import './Feed.css';

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  // const [message, setMessage] = useState("");
  // const [user, setUser] = useState("");


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

  const handlePostSubmit = async (event) => {
    event.preventDefault();

    if(token) fetch('/posts', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: message, user: token})
    })
      .then(response => response.json())
      .then(
        data => {          
        window.localStorage.setItem("token", data.token)
        setToken(window.localStorage.getItem("token"))
        console.log(data)
      })
  }
  
  const handleMessageChange = (event) => {
    setMessage(event.target.value)
  } 

  
  const logout = () => {
    window.localStorage.removeItem("token")
    navigate('/login')
  }

    if(token) {
      return(
        <>
          <h2>Posts &#128075;</h2>

            <button onClick={logout}>
              Logout
            </button>

          <div id='feed' role="feed">
              {posts.map(
                (post) => ( 
                <Post post={ post } key={ post._id } /> )
              )}
          </div>
          <div class="footer">
           <p>Ⓒ The Incredibles</p>
          </div>
        </>
      )
    } else {
      navigate('/signin')
    }
}

export default Feed;