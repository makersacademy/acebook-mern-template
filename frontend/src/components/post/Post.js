import React from 'react';
import './Post.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'

const elementEnvelope = <FontAwesomeIcon icon={ faHeart } />

const Post = ({post}) => {
  return(
        <div class="post-wrap" data-cy="post" key={ post._id}>
  
          <div class="post-header">
            <img src="/images/bird-avator.png" alt="avatar" class="avatar" ></img> 
            <div class="post-header-info">
              <span id="user-name">{post.user.name}</span>
              <span id="time">{post.date.substr(11,5)}</span>  
              <span id="date">{post.date.substr(0,10)}</span>
              <p id="post-content">{post.message}</p>
            </div>
          </div>
    
          <div class="likes-container">
            <div class="likes">
              <button id="likes-button"> { elementEnvelope }</button>
              <span id="likes-count"></span>
            </div>
          </div>
        </div>
  )
}

export default Post;



 
