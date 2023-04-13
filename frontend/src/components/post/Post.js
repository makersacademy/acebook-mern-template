import React, { useEffect, useState } from 'react';
import './Post.css'

const Post = ({ post }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [ownerData, setOwnerData] = useState({});
  const [newComment, setNewComment] = useState("");
  const [likes, setLikes] = useState(post.likes.length);

  useEffect(() => {
    if (token) {
      fetch(`/posts/${post.createdBy}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(response => response.json())
        .then(async data => {
          window.localStorage.setItem("token", data.token);
          setToken(window.localStorage.getItem("token"));
          setOwnerData(data.ownerData);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [token]);


  const handleNewCommentChange = (event) => {
    setNewComment(event.target.value);
  }

  const handleSubmit = (event) => {
    if (newComment === "") return

    event.preventDefault();

    fetch ('/comments', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({message: newComment})
    }) 
  }

  const handleLikes = () => {
    console.log('clicked');
    fetch(`/posts/${post._id}/like`, {
      method: "PUT",
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(response => response.json())
      .then(async data => {
        const updatedLikes = data.likes;
        setLikes(updatedLikes);
      })
      .catch(error => {
        console.log(error);
      });
  }  

  const dateObj = new Date(post.createdAt)
  const options = {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  };

  const humanReadableTime = dateObj.toLocaleString('en-GB', options).replace(/,/g, '');

  const hasImage = 'image' in post // boolean: check if post has an image
  let imageLocation;
  if (hasImage) { imageLocation = `/uploads/${post.image.fileName}` }

  return(
    <div id="post-container">

      <div id="post-header">
        <div id="post-avatar-container">
          <img className="post-avatar" alt="avatar" src={ownerData.avatar}></img>
        </div>
        <div id="post-inner-header">
          <h3 className="post-owner-username">{ownerData.username}</h3>
          <time dateTime={post.createdAt}>{humanReadableTime}</time>
        </div>
      </div>

      <div id='post-content'>
        <article data-cy="post" className="post-message" key={post._id}>{post.message}</article>
        <div id="post-content-image">
        {hasImage ? <img src={imageLocation}></img> : null }
      </div>
      </div>

      <div id="post-counters">
        <button className="post-counter">
          <i className="fa-sharp fa-solid fa-heart fa-lg" onClick={handleLikes}></i>
          {likes} likes
        </button>
        <button className="post-counter">{post.comments} comments</button>
      </div>

      <div id="new-comments-container">
        <div className="invisible"></div>
        <input type='text' id='post' className="new-comment-field" placeholder="Comment" value={newComment} onChange={handleNewCommentChange} ></input>
        <button className="new-comments-submit-btn" onClick={handleSubmit}><i className="fa-regular fa-envelope fa-2x"></i></button>
      </div>    
      
    </div>
  )
}

export default Post;
