import React from 'react';
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

    <div class="new-comment-container">
      <form class="new-comment-form">
        <input placeholder="Respond to this joke of a post..." class="new-comment" type="text" />
        <input role='submit-button' class='submit-button' type="submit" value="Retaliate" />
      </form>
    </div>
  </div>
)
}
export default Comment;