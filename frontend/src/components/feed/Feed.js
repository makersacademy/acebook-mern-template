import React, { useEffect, useState } from 'react';
import { storage } from './firebase';
import { uploadBytes, ref, getDownloadURL} from 'firebase/storage';
import { v4 } from 'uuid';
import Navbar from '../Navbar/Navbar';
import Post from '../post/Post';
import './Feed.css';

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");

  const UploadImage = () => {
    if (image === null) return;

    const imageRef = ref(storage, `images/${image.name + v4()}`); 
    uploadBytes(imageRef, image).then((snapshot) => { 
      alert("Image Uploaded")
      getDownloadURL(snapshot.ref)
        .then((url) => {   
          console.log(url);
          setImageURL(url);  
        });
        setImage(null);
      });
  };

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
          //console.log(data);
          setPosts(data.posts);
        })
    }
  }

  const loadUser = () => {
    if(token) {
      fetch("/sessions", {
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
          setUserId(data.id);
        })
    }
  }

  loadUser();

  
  useEffect(loadPosts, [])

  const handlePostSubmit = async (event) => {
    event.preventDefault();
    setMessage('');

    UploadImage();

    if(token) fetch('/posts', {
      method: 'post',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({token: token, message: message, img: imageURL})
    })
      .then(response => response.json())
      .then(
        data => { 
        if (data.message === 'Field cannot be empty') {
          document.querySelector(".emptyPostErrorMessage").style.display = 'block'
        } else {
          loadPosts();
          console.log(data);
          handlePopUpClosing();
        }
        
      })
  }

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  } 
  
  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  }

  const handlePopUp = () => {
    document.querySelector(".popup-background").style.display = 'block';
    document.querySelector(".create-post-box").style.display = 'block';

  }

  const handlePopUpClosing = () => {
    document.querySelector(".create-post-box #post-message").value = '';
    document.querySelector(".popup-background").style.display = 'none';
    document.querySelector(".create-post-box").style.display = 'none';
    document.querySelector(".emptyPostErrorMessage").style.display = 'none'
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
            <div className="emptyPostErrorMessage">No empty thoughts allowed! &#128584;</div>
            <input id="post-message" placeholder={`What's on your mind, ${userName}?`} type='text' value={ message } onChange={handleMessageChange} />
            <div className="upload-post-image-section">
              <input type="file" id="postImage" name="filename" onChange={handleImageChange} /> 
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
            <Post post={ post } key={ post._id } sessionUserName = { userName } sessionUserId = { userId } /> )
          )}
      </div> 
      </>
    )
  } else {
    navigate('/')
  }
  
   
}

export default Feed;