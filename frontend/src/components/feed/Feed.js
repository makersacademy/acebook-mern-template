import React, { useEffect, useState } from 'react';
import Post from '../post/Post'
import LikeButton from '../likeButton/LikeButton';

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [message, setMessage] = useState("")
  const [likes, setLikes] = useState(0)

  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch( '/posts', {
      method: 'post',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: message, likeCount: likes })
    })
      .then(response => {
        if(response.status === 201) {
          navigate('/posts')
        } else {
          navigate('/posts')
        }
      })
  }

  const handleMessage = (event) => {
    setMessage(event.target.value)
  }

  const handleLikes = (event) => {
    setLikes(event.target.value)
  }

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

  
    if(token) {
      return(
        <>
          <h2 class="postTitle">Posts</h2>
            <button onClick={logout}>
              Logout
            </button>
            <form onSubmit={handleSubmit} class="homePage">
              <label>Your post: </label>
              <input type="text" size="50" id="message" value={ message } onChange={handleMessage}></input>
              <input type="hidden" id="likes" value={ likes } onChange={handleLikes}/>
              <input type="submit" id="submit" value="Submit"></input>
            </form>
          <div id='feed' role="feed">
              {posts.map(
                (post) => ( <Post post={ post } key={ post._id } /> )
              ).reverse()
              }
          </div>
        </>
      )
    } else {
      navigate('/signin')
    }
}



export default Feed;