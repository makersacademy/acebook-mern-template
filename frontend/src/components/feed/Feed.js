import React, { useEffect, useState } from 'react';
import Post from '../post/Post'

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [message, setMessage] = useState("");
  const handleMessageChange = (event) => {
    setMessage(event.target.value)
  }
  const [errorMessage, setErrorMessage] = useState("");

  
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

    fetch( '/posts', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ message: message })
    })
      .then(response => {
        if(response.status === 201) {
          let newPosts = [...posts, {message: message}]
          setPosts(newPosts)
          setMessage("")
        } else {
          console.log(response);
          setErrorMessage('Invalid message!');
          navigate('/posts')
        }
      })
  }

  
    if(token) {
      return(
        <>
          <button onClick={logout}>
            Logout
          </button>
          <h1>Posts</h1>
          <form onSubmit={handleSubmit}>
            <input placeholder="Message" id="message" type='text' value={ message } onChange={handleMessageChange} />
            <input id='submit' type="submit" value="Submit" />
            {errorMessage && (
            <p className="error"> {errorMessage} </p>)}
          </form>
          <div id='feed' role="feed">
              {posts.map(
                (post) => ( <Post post={ post } key={ post._id } /> )
              )}
          </div>
        </>
      )
    } else {
      navigate('/login')
    }
}

export default Feed;
