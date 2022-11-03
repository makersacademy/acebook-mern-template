import React, { useEffect, useState } from 'react';
import Post from '../post/Post';
import './Feed.css';

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const loadPosts = () => {
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
          console.log(data);
          setPosts(data.posts);
        })
    }
  }
  
  useEffect(loadPosts, [])

  const handlePostSubmit = async (event) => {
    event.preventDefault();

    if(token) fetch('/posts', {
      method: 'post',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({token: token, message: message})
    })
      .then(response => response.json())
      .then(
        data => { 
        loadPosts();   
        console.log(data);
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
        <> <body className="posttitle">
          <h1>Posts &#128075;</h1>
          </body>
          <form onSubmit={handlePostSubmit}>
          <body className="createpost">
            <h3>Create a New Post</h3>
            <textarea placeholder="Share what you think" type="text" value={ message } onChange={handleMessageChange}>
            </textarea>
            <input id='submitPost' type="submit" value="Post" />
            </body>
          </form>
            <button onClick={logout}>
              Logout
            </button>
            <body className="postbody">
          <div id='feed' role="feed">
              {posts.map(
                (post) => ( 
                <Post post={ post } key={ post._id }/> )
              )}
          </div>
          
          <div className="footer">
           <p>Ⓒ The Incredibles</p>
          </div>
        </>
      )
    } else {
      navigate('/signin')
    }
}

export default Feed;