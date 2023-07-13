import React from "react";

const Comment = ({ comment, onNewComment, token }) => {
  const handleCommentLike = async () => {
    console.log("handleLike is triggered");
    const response = await fetch(`/comments/${comment._id}/like`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (onNewComment) {
      onNewComment(comment._id, data.likes);
    }
  };
  console.log(comment.likes);
  return (
    <div className="comment-container" data-cy="comment" key={comment._id}>
      <div className="username">{comment.username}</div>
      <div className="time">{comment.time}</div>
      <div className="comment">{comment.comment}</div>
      <button onClick={handleCommentLike}>
        <span role="img" aria-label="like">
          {"👍"}
        </span>
      </button>
      <div>{comment.likes ? comment.likes.length : 0} likes</div>
    </div>
  );
};

export default Comment;
