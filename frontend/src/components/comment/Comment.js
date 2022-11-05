import React from 'react';
import NewComment from '../newComment/NewComment'
import "./Comment.css";

const Comment = ({}) => {
return (
  <div class="bottom-container">
    <div class="comments-container">
      <div class="comment-header">
        <div class="comment-username">{"{ Name }"}</div>
        <div class="comment-time">{"{ Comment time }"}</div>
      </div>
      <div class="comment">{"<example comment>"}</div>
    </div>
    <NewComment />
    
  </div>
)
}
export default Comment;