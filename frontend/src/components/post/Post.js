import React from 'react';
import './Post.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faHeart } from '@fortawesome/free-regular-svg-icons'
// import { faHeart } from '@fortawesome/free-solid-svg-icons' 
import { faHeart as faSolideHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

const elementHeartOutline = <FontAwesomeIcon icon={ faRegularHeart } size = '2x' />
const elementPaperPlane = <FontAwesomeIcon icon={ faPaperPlane } size = '2x' />
const token = window.localStorage.getItem("token");

const handleNewLike = post => {
  if(token) fetch("/posts", {
    method: 'put',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({token: token, post: post})
  })
    .then(response => response.json())
    .then(
      data => { 
      console.log(data)  
    })
}

const Post = ({post}) => {
  return(
        <div className="posts-container" data-cy="post" key={ post._id}> 
          <div className="post">
            {/* POST HEADER */}
            <div className="post-header"> 
              <div className="header-left">
              <img src="/images/bird-avator.png" alt="avatar" className="post-author-pic" ></img> 
                <div className="post-author">
                  <span className="author-name">{post.user.name}</span>
                </div>
                <span className="post-date">{post.date.substr(11,5)} {post.date.substr(0,10)}</span>
              </div>
            </div>
            {/*POST CONTENT */}
            <div className="post-content">
              <p className="content-paragraph">{post.message}</p>

            </div>
            {/*POST FOOTER*/}
            <div className="post-footer">
              <div className="reactions-container">
                <div className="likes">
                <form onSubmit={ () => handleNewLike(post) }>
                  <button id="likes-button"> { elementHeartOutline } </button>
                  <span id="likes-count">{post.likes.length}</span>
                </form>
                </div>
                <div>
                  <span className="comments-number">12 Comments</span>
                </div>
              </div>
              <div className="saparator"></div>
            </div>
            {/* WRITE COMMENT*/}
            <div className="comments">
              <div className="comments-box">
                <div className="box-profile">
                  <img src="/images/bird-avator.png" alt="avatar" className="profile-pic" ></img> 
                </div>
                <div className="box-bar">
                  <input type="text" placeholder='Write a comment...' className="bar-input"></input>
                  <button className="write-comment-btn">{ elementPaperPlane  }</button>
                </div>
              </div>
            </div>
            {/* SEE COMMENTS  - will need to be a separate component */}
            <div className="all-comments-section">
              <img src="/images/bird-avator.png" alt="avatar" className="comment-author-pic" ></img> 
              <div id="single-comment-wrapper">
                <span className="comment-author">Comment Author</span>
                <span className="comment-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </span>
              </div>
            </div>

            {/* SEE COMMENTS - duplicate to display as example */}
            <div className="all-comments-section">
              <img src="/images/bird-avator.png" alt="avatar" className="comment-author-pic" ></img> 
              <div id="single-comment-wrapper">
                <span className="comment-author">Comment Author</span>
                <span className="comment-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </span>
              </div>
            </div>
          
          </div>
        </div> 
  )
}


export default Post;



 
