import React from 'react';
import './Post.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

const elementHeartOutline = <FontAwesomeIcon icon={ faHeart } />
const elementPaperPlane = <FontAwesomeIcon icon={ faPaperPlane } />

// const loadLikes = () => {
//   fetch('/posts/likes', {
//     method: 'post',
//     headers: {'Content-Type': 'application/json'},
//     body: JSON.stringify({post: post._id})
//   })
//   .then(response => response.json())
//   .then(data =>
//     data.likes)
// } 

const Post = ({post}) => {
  return(

        // <div class="post-wrap" data-cy="post" key={ post._id}>
  
        //   <div class="post-header">
        //     <img src="/images/bird-avator.png" alt="avatar" class="avatar" ></img> 
        //     <div class="post-header-info">
        //       <span id="user-name">{post.user.name}</span>
        //       <span id="time">{post.date.substr(11,5)}</span>  
        //       <span id="date">{post.date.substr(0,10)}</span>
        //       <p id="post-content">{post.message}</p>
        //     </div>
        //   </div>
    

        //   <div class="likes-container">
        //     <div class="likes">
        //       <button id="likes-button"> { elementEnvelope }</button>
        //       <span id="likes-count">{post.likes.length}</span>
        //     </div>
        //   </div>
        // </div>

        <div className="container" data-cy="post" key={ post._id}> 
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
                  <button id="likes-button"> { elementHeartOutline }</button>
                  <span id="likes-count">{post.likes.length}</span>
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
                  <button className="write-comment">{ elementPaperPlane  }</button>
                </div>
              </div>
            </div>
            {/* SEE COMMENTS*/}
            <div className="all-comments">
              <img src="/images/bird-avator.png" alt="avatar" className="comment-author-pic" ></img> 
              <div clasName="comment-section">
                <span className="comment-author">Comment Author</span>
                <span className="comment-content">Fake comment!</span>
              </div>
            </div>
            


          </div>
        </div> 
  )
}

export default Post;



 
