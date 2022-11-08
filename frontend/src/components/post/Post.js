import './Post.css';
import CommentForm from '../comment/CommentForm';
import Comment from '../comment/comment';
import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'

const elementHeartOutline = <FontAwesomeIcon icon={ faHeart } size = '2x' />


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
  const [comments, setComments] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const loadComments = () => {
    if(token) {
      fetch("/comments", {
        headers: {
        'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(async data => {
        window.localStorage.setItem("token", data.token)
        setToken(window.localStorage.getItem("token"))
        // console.log(data);
        setComments(data.message);
      })
    }
  }

  const relatedComments = [];

  comments.map(
    (comment) =>  {
      if (post._id === comment.post) {
        relatedComments.push(comment);
      }
    });

  useEffect(loadComments, []);

  return(
        <div className="posts-container" data-cy="post" key={ post._id }> 
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
                  <span className="comments-number">{relatedComments.length} Comments</span>
                </div>
              </div>
              <div className="saparator"></div>
            </div>
            {/* WRITE COMMENT*/}
            <CommentForm postId={ post._id } loadComments = { loadComments }/>

            {/* ALL COMMENTS*/}
            {relatedComments.map(
              (comment) => ( 
                <Comment comment={ comment } key={ comment._id }/>  )
            )}
          </div>
        </div> 

  )
}

export default Post;



 
