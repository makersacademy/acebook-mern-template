import React, { useState } from "react";

const CommentForm = ({ token, onNewComment, postId }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("/comments", {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment: comment,
        postId: postId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response data:", data);
        if (data.comment) {
          onNewComment(data.comment);
          setComment("");
        }
      });
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <input
        type="text"
        id="comment"
        name="comment"
        placeholder="Write a comment..."
        required
        value={comment}
        onChange={handleCommentChange}
      />
      <button type="comment-submit">Post</button>
    </form>
  );
};

export default CommentForm;
