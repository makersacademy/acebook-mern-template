import React, { useState } from 'react';

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
      <>
      <form onSubmit={handleSubmit} id="commentForm">
        <textarea rows="1" cols="50" placeholder='...' id="comment" value={ comment } onChange={handleCommentChange} form="commentForm"/>
        <input role='submit-button' id='submit' type="submit" value="Submit" />
      </form>
      </>
    );
}

export default CreateCommentForm;
