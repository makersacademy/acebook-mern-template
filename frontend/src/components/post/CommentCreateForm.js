import React, { useState } from 'react';

const CommentCreateForm = ({postId, token, setToken}) => {
  const [comment, setComment] = useState("");
  const [validationError, setValidationError] = useState("");

  const submitComment = async (event) => {
    event.preventDefault();

    if (validateInput()) {
      let time = new Date();

      let response = await fetch("/posts/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ postId: postId, message: comment, time: time})
      })

      let commentId = undefined

      if (response.status !== 201) {
        console.log("Failed to submit POST request");
        setValidationError("Server error at POST /posts/comments");
      } else {
        let data = await response.json();
        console.log(data);
        commentId = data.commentId;
      }

      if (commentId !== undefined) {
        response = await fetch("/posts/comments", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ postId: postId, commentId: commentId })
        })
      }
    }
  }

  const validateInput = () => {
    if (comment.length > 0) {
      setValidationError("");
      return true;
    } else {
      setValidationError("Please enter a post");
      return false;
    }
  };

  const handleCommentChange = event => {
    setComment(event.target.value);
  }

  return (
    <form className="comment-create-form" onSubmit={submitComment} noValidate>
      <input className="comment-input" placeholder="Write a comment..." onChange={handleCommentChange} required/>
      <input className="comment-submit" id="comment-submit" type="submit" value="Comment"/>
      <p className="validation-error">{validationError}</p>
    </form>
  );
}

export default CommentCreateForm;