import React from 'react';
import './Post.css'

const Post = ({ post }) => {
  console.log(post)

  // implement logic to get post owner data (fetch request, routes and interaction with db)

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
  
  return (
    <div id="post-container">

      <div id="post-header">
        <img className="post-avatar" src='/default_avatar.png'></img> {/* change for ownerData.avatar */}
        <div id="post-inner-header">
          <h3 className="post-owner-username">Chang</h3> {/* change for ownerData.username */}
          <time dateTime={post.createdAt}>{humanReadableTime}</time>
        </div>
      </div>

      <article data-cy="post" className="post-message" key={post._id}>{post.message}</article>
      
      <div id="post-counters">
        <button className="post-counter"><i class="fa-sharp fa-solid fa-heart fa-lg"></i>0 likes</button> {/* change for ownerData.likes */}
        <button className="post-counter">0 comments</button> {/* change for ownerData.comments */}
      </div>

      <div id="post-btns">
        <button className="post-btn">Like</button> {/* Implement behaviour */}
        <button className="post-btn">Comment</button> {/* Implement behaviour */}
      </div>    
      
    </div>
  )
}

export default Post;
