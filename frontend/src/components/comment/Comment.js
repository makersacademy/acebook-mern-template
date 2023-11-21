import React from 'react';
import './Comment.css';

const Comment = ({comment}) => { 
  return (
    <div className='comment-box'> 
      <article data-cy="comment-author" className='comment-author'>
        Author: {comment.author._id}
      </article>
      <article data-cy="comment-date" className='comment-date'>
        Date: {comment.created}
      </article>
      <article data-cy="comment-content" key={comment._id} className='comment-content'>
        {comment.content}
      </article>
      <div style={{ display: 'flex' }}>
        <img src='thumb-icon.png' className='like-btn' alt='thumb'/>
        <article data-cy="comment-likes" className='like-number'>
          Likes: {comment.number_of_likes}
        </article>
      </div>
    </div>
  );
};


export default Comment;
