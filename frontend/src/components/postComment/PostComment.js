import React from 'react';
import '../post/Post.css';

const Comment = ({ comment }) => {
  return (
    <p>
      {comment.text}
      <br></br>
      {comment.created}
    </p>
  );
};

export default Comment;
