// when doing this, pass the post ID through to the backend !! comment.post_id or post._id
import MessageHeader from "../messageHeader/MessageHeader";

import React from "react";

const Comment = ({ comment }) => {
  return (
    <article data-cy="comment" key={comment._id}>
      <MessageHeader user_id={comment.user_id}/>

      {comment.message}
    </article>
  );
};

export default Comment;
