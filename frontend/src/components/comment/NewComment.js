import React, { useState } from 'react';

const NewComment = ({ postId }) => {
  const [content, setComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [emptyFieldsError, setEmptyFieldsError] = useState("");
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleAddComment = async () => {
    if (!content) {
      setErrorMessage("You did not insert a comment");
      return;
    } else {
      setEmptyFieldsError("");
    }

    try {
      const response = await fetch('api/comments', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content: content, post_id: postId })
      }).then(response => {
        // update the comments / re-render comments
        // clear the content
      });

      if (response.status === 201) {
        let data = await response.json();
        setToken(data.token);
      } else {
        setErrorMessage('Error creating comment. Please try again.');
      }
    } catch (error) {
      console.error('Error creating comment:', error);
      setErrorMessage('Error creating comment. Please try again.');
    }
  };

  return (
    <div>
      <h2>New Comment</h2>
      <input
        placeholder="Comment"
        id="comment"
        type='text'
        value={content}
        onChange={handleCommentChange}
      />
      <button role='submit' id='submit' className='primary-btn' onClick={handleAddComment}>
        Add Comment
      </button>
      {emptyFieldsError && <p style={{ color: 'red' }}>{emptyFieldsError}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default NewComment;


