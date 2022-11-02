import React, { useEffect, useState } from 'react';
import Post from '../post/Post';
import './Feed.css';

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
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
    
  // fetch( '/posts', {
  //   method: 'post',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ message: message})
  // })
  //   .then(response => {
  //     if(response.status === 201) {
  //       navigate('/posts')
  //     } else {
  //       navigate('/login')
  //     }
  //   })

  
  const logout = () => {
    window.localStorage.removeItem("token")
    navigate('/login')
  }

  const createPost = () => {
    navigate('/createPost')
  }

  // const handleMessageChange = (event) => {
  //   setMessage(event.target.value)
  // }

  //const handleUserChange = (event) => {
    //setUser(event.target.value)
  //}


    if(token) {
      return(
        <>
          <h2>Posts &#128075;</h2>
          {/* <textarea placeholder="Message" id="message" type='text' value={ message } onChange={handleMessageChange}></textarea>
          <br />
          <input id='messagesubmit' type="submit" value="Submit" />
          <br /> */}
            <button onClick={createPost}>
              Create a new post
            </button>

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