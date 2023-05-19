import React from 'react';
import Post from '../post/Post';
import './Comment.css'

const Comment = (comment) => {
  return (
    <div className='comment'>
      <div className='comment-img'>
        <img src='./troll.jpeg'></img>
      </div>
      <div className='comment-body'>
        <h5>Anon Commented</h5>
        <h4>{comment.comment}</h4>
      </div>
    </div>
  )
};

export default Comment;