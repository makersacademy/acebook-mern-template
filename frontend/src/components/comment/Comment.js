import React from 'react';
import './Comment.css';
import '../post/Post.css';

const Comment = ({ comment }) => {

  // Format datetime of post.
  const date = new Date(comment.created);
  const dateFormat = { year: 'numeric', month: 'numeric', day: 'numeric' };
  const timeFormat = { hour: 'numeric', minute: 'numeric', hour12: false };
  const formattedDate = date.toLocaleDateString('en-GB', dateFormat);
  const formattedTime = date.toLocaleTimeString('en-GB', timeFormat);


  return (
    <div className='comment-box'>
      <article data-cy="comment-author" className='comment-author'>
        {comment.author.firstName} {comment.author.lastName} 
      </article>
      <article data-cy="comment-date" className='post-date'>
        Date: {formattedDate} Time: {formattedTime}
      </article>
      <article data-cy="comment-content" key={comment._id} className='comment-content'>
        {comment.content}
      </article>
      <div style={{ display: 'flex' }}>
        <img src='thumb-icon.png' className='like-btn' alt='thumb' />
        <article data-cy="comment-likes" className='like-number'>
          Likes: {comment.number_of_likes}
        </article>
      </div>
    </div>
  );
};

export default Comment;

