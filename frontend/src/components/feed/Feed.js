import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Post from '../post/Post';
import './Feed.css';

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState();
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [userName, setUserName] = useState("");

  
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

  const loadUser = () => {
    if(token) {
      fetch("/users", {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })
        .then(response => response.json())
        .then(async data => {
          // window.localStorage.setItem("token", data.token)
          // setToken(window.localStorage.getItem("token"))
          console.log(data);
          setUserName(data.name);
        })
    }
  }

  loadUser();

  
  useEffect(loadPosts, [])

  const handlePostSubmit = async (event) => {
    event.preventDefault();
    setMessage('');

    if(token) fetch('/posts', {
      method: 'post',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({token: token, message: message, img: image})
    })
      .then(response => response.json())
      .then(
        data => { 
        loadPosts();   
        console.log(data);
        handlePopUpClosing();
      })
  }

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  } 
  
  const handleImageChange = (event) => {
    setImage(event.target.value);
  }

  const handlePopUp = () => {
    document.querySelector(".popup-background").style.display = 'block';
    document.querySelector(".create-post-box").style.display = 'block';
  }

  const handlePopUpClosing = () => {
    document.querySelector(".create-post-box #post-message").value = '';
    document.querySelector(".popup-background").style.display = 'none';
    document.querySelector(".create-post-box").style.display = 'none';
  }

  if(token) {
    return(
      <> 
      <Navbar/>

      {/* CREATE POST POPUP */}
      <div className='create-post-box'>
          <div onClick={ handlePopUpClosing } className="close-btn-create-post">&times;</div>
          <header>Create Post</header>
          <hr/>
          <form onSubmit={ handlePostSubmit }>
            <input id="post-message" placeholder={`What's on your mind, ${userName}?`} type='text' value={ message } onChange={handleMessageChange} />
            <div className="upload-post-image-section">
              <input type="file" id="postImage" name="filename" value={image} onChange={handleImageChange} /> 
              <span id='image-instructions'> Add image to your post </span>
            </div>
            <button type="submit">Post</button>
         </form>
        </div>
      <div className='popup-background'></div>

      {/* WRITE POST FIELD */}
      <div className='write-post-container'>
        <div className='write-post-box'>
          <img src="/images/bird-avator.png" alt="avatar" className="write-post-pic" ></img> 
          <div onClick={ handlePopUp } className='write-post-input'>
          {`What's on your mind, ${userName}?`}
          </div>
        </div>
      </div>
        
      {/* POSTS FEED */}
      <div className='posts-feed'>
          {posts.map(
            (post) => ( 
            <Post post={ post } key={ post._id }/> )
          )}
      </div> 
      </>
    )
  } else {
    navigate('/')
  }
  
   
}

export default Feed;