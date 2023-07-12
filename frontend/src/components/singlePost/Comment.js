import React from "react";

const Comment = ({ comment }) => {
  return (
    <article data-cy="comment" key={comment._id}>
      {comment.comment}
      <br />
      Posted by: {comment.user.email}
      <br />
    </article>
  );
};

export default Comment;