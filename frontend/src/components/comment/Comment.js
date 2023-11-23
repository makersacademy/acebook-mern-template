// when doing this, pass the post ID through to the backend !! comment.post_id or post._id
import MessageHeader from "../messageHeader/MessageHeader";

import React from "react";

const Comment = ({ comment }) => {
  return (
    <article data-cy="comment" key={comment._id}>
      <div id="comment-msg-header">
        {/* <MessageHeader user_id={comment.user_id}/> */}
      </div>
      <div id="comment-msg-content">
        {comment.message}
      </div>
    </article>
  );
};

export default Comment;
