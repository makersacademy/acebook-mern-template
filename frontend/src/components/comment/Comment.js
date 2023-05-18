import React from 'react';
import Post from '../post/Post';

const Comment = (comment) => {
  return (
    <div>
    <h3>{comment.comment}</h3>
  </div>
  )
};

export default Comment;