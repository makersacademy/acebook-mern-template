import React, { useEffect, useState } from 'react';
import Post from '../post/Post'
// import './Feed.css'


const Feed = ({ navigate }) => {
  const [userData, setUserData] = useState({})
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
          setUserData(data.user)
        })
    }
  }, [])
    

  const logout = () => {
    window.localStorage.removeItem("token")
    navigate('/login')
  }

  const new_post = async (event) => {
    if (!newPost) return
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
        window.location.reload(); // should be changed to be more React'ful
      } else {
        throw new Error('Failed to create post');
      }
    })
  }

  const handleNewPostChange = (event) => {
    setNewPost(event.target.value);
  }

  if (token) {
    return(
      <>
        <div id='main-container' >
          <nav id="navbar">
            <h1>ACEBOOK</h1>
            <div id="navbar-btns">
              <button className="navbar-btn">My profile</button>
              <button className="navbar-btn">Photos</button>
              <button className="navbar-btn" onClick={logout}>Logout</button>
            </div>
          </nav>
          <div id="user-banner-container">

            <div id="user-banner-img">

              <img src='/default_avatar.png'></img>

            </div>
            <div id="user-banner-info">

              <h2>{ userData.username }</h2>
              <p>{ userData.email }</p>
              
            </div>
          </div>

          <div id="inner-container">
            {/* <h2>Posts</h2> */}
            <form className="new-post-form">
              <input type='text' id='post' className="text-field" placeholder="What do you have in mind?" value={newPost} onChange={handleNewPostChange}></input>
              <button className="post-submit-btn" onClick={new_post}>Send</button>
            </form>
            <div id='feed' role="feed">
              {posts.map(
                (post) => ( <Post post={ post } key={ post._id } /> )
              )}
            </div>
          </div>
        </div>     
      </>
    )
  } else {
    navigate('/signin')
  }
}

export default Feed;