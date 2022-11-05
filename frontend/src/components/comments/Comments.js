import React from 'react';
import NewComment from '../newComment/NewComment'
import "./Comments.css";

const Comments = ({ }) => {
  return (
    <>
        <NewComment />
      <div class="comments-container">
        <div class="comment-header">
          <img class="comment-profile-image" src='https://iili.io/mVK9G2.png' alt='kyle' />
          <div class="comment-username">{"{ Name }"}</div>
          <div class="comment-time">{"{ Comment time }"}</div>
          <div class="comment-name-and-time-container">
                       
          </div>
        </div>
        <div class="comment">{"<example comment>"}</div>
      </div >
    </>
  )
}
export default Comments;


