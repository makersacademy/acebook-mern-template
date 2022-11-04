import React, { useEffect, useState } from 'react';
import Post from '../post/Post'

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [post, setPost] = useState([]);

  const getPosts = () => {
    console.log('is there a token?')
    console.log(token)
    if(token) {
      console.log('fetch request now:')
      console.log(token)
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

  useEffect(() => {
    getPosts();
  }, [])
    
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    let response = await fetch( '/posts', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ message: post, date: Date.now()})
    });

    if(response.status === 201) {
      console.log("yay")
      getPosts();
    } else {
      console.log("oop")
      // error message goes here
    }
  }

  const handlePostChange = (event) => {
    setPost(event.target.value)
  }

  const logout = () => {
    window.localStorage.removeItem("token")
    navigate('/login')
  }
  
    if(token) {
      return(
        <>
          <h2>Posts</h2>
            <button onClick={logout}>
              Logout
            </button>
          <h3>
            <form onSubmit={handleSubmit}>
              <input placeholder='Post' id="post" type='text' value={ post } onChange={handlePostChange} />
              <input role='submit-button' id='submit' type="submit" value="Submit" />
            </form>
          </h3>
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