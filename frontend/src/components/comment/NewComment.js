import React, { useState, useEffect } from 'react';

const NewComment = ({ postId, fetchPosts }) => {
  // State variables
  const [content, setComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [emptyFieldsError, setEmptyFieldsError] = useState("");
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [comments, setComments] = useState([]);

  // Fetch comments on component mount or when postId changes
  useEffect(() => {
    fetchUpdatedComments(postId);
  }, [postId]);

  // Handle comment input change
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  // Handle adding a new comment
  const handleAddComment = async () => {
    try {
      // Validate comment content
      if (!content) {
        setErrorMessage("You did not insert a comment");
        return;
      } else {
        setEmptyFieldsError("");
      }

      // Make a POST request to add a new comment
      const response = await fetch('api/comments', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content, post_id: postId })
      });

      // Check if the request was successful
      if (!response.ok) {
        setErrorMessage('Error creating comment. Please try again.');
        return;
      }

      // Update token, clear comment content, and fetch updated comments
      if (response.status === 201) {
        let data = await response.json();
        setToken(data.token);
        setComment("");
        fetchPosts();
      } else {
        setErrorMessage('Error creating comment. Please try again.');
      }
    } catch (error) {
      console.error('Error creating comment:', error);
      setErrorMessage('Error creating comment. Please try again.');
    }
  };

  // Fetch updated comments for a given post
  const fetchUpdatedComments = async (postId) => {
    try {
      const response = await fetch(`/api/comments?post_id=${postId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // Check if the request was successful
      if (!response.ok) {
        console.error('Error fetching comments:', response.status);
        return;
      }

      // Update the comments state with the fetched data
      const data = await response.json();
      setComments(data.comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  return (
    <div>
      <h2>Add Comment</h2>
      <input
        placeholder="Comment"
        id="comment"
        type='text'
        value={content || ""}
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



