import React, { useEffect, useState } from 'react';
import './Post.css'

import React from 'react';

const Post = ({ post }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [ownerData, setOwnerData] = useState({});

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
        <img className="post-avatar" src='/default_avatar.png'></img> {/* change for ownerData.avatar */}
        <div id="post-inner-header">
          <h3 className="post-owner-username">Chang</h3> {/* change for ownerData.username */}
          <time dateTime={post.createdAt}>{humanReadableTime}</time>
        </div>
      </div>

      <div id='post-content'>
        <article data-cy="post" className="post-message" key={post._id}>{post.message}</article>
        <div>
        {hasImage ? <img src={imageLocation}></img> : null }
      </div>
      </div>

      <div id="post-counters">
        <button className="post-counter"><i className="fa-sharp fa-solid fa-heart fa-lg"></i>0 likes</button> {/* change for ownerData.likes */}
        <button className="post-counter">0 comments</button> {/* change for ownerData.comments */}
      </div>

      {/* <div id="post-btns"> */}
      <div id="comments-container">
        <div className="invisible"></div>
        {/*<button className="post-btn">Like</button> {/* Implement behaviour */}
        {/* <button className="post-btn">Comment</button> Implement behaviour */}
        <input type='text' id='post' className="comment-field" placeholder="Comment"></input>
        <button className="comments-submit-btn"><i className="fa-regular fa-envelope fa-2x"></i></button>
      </div>    
      
    </div>
  )
}

export default Post;
