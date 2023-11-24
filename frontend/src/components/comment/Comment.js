// when doing this, pass the post ID through to the backend !! comment.post_id or post._id
import MessageHeader from "../messageHeader/MessageHeader";
import "./Comment.css"

import React from "react";

const Comment = ({ comment }) => {
  return (
    <article className="comment-box" data-cy="comment" key={comment._id}>
      <div className="comment-message-header" id="comment-msg-header">
        <MessageHeader user_id={comment.user_id}/>
      </div>
      <div className="comment-text" id="comment-msg-content">
        {comment.message}
      </div>
    </article>
  );
};

export default Comment;
