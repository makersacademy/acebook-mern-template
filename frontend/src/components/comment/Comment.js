import React from "react";

const Comment = ({ comment }) => {
  return (
    <div className="comment-container" data-cy="comment" key={comment._id}>
      <div className="username">{comment.username}</div>
      <div className="time">{comment.time}</div>
      <div className="comment">{comment.comment}</div>
      {/* <input type="text"></input> */}
    </div>
  );
};

export default Comment;
