import React, { useState } from 'react';
import './CommentForm.css';

const CreateCommentForm = ({ onCreated, postId }) => {
  const [comment, setComment] = useState("");
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch( '/comments', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ comment: comment, postId: postId })
    })

    setComment("")
    onCreated();
  }

  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }

    return (
      <form onSubmit={handleSubmit} id="commentForm" className="comment-form">
        <textarea rows="2" cols="50" placeholder='Add a comment...' id="comment" value={ comment } onChange={handleCommentChange} form="commentForm"/>
        <input role='submit-button' id='submit-comment' type="submit" value="Comment" />
      </form>
    );
}

export default CreateCommentForm;
