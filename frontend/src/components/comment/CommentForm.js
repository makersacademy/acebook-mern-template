import React, { useState } from "react";

const CommentForm = (props) => {
  const [comment, setComment] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("/comments", {
      method: "post",
      headers: {
        Authorization: `Bearer ${props.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment: comment,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response data:", data);
        if (data.comment) {
          props.onNewComment(data.comment);
          setComment("");
        }
      });
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  return (
    <>
      <form className="comment-form" onSubmit={handleSubmit}>
        <input
          type="text"
          id="comment"
          comment="comment"
          required
          value={comment}
          onChange={handleCommentChange}
        />
        <button type="submit">Comment</button>
      </form>
    </>
  );
};

export default CommentForm;
