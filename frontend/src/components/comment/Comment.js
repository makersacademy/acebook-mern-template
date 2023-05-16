import React from 'react';
import './Comment.css';

const Comment = ({comment, index}) => {
  return (
    <div className='commentbox commentflex'>
      <article data-cy="comment" key={index}>
        <p className="comment-text">{comment.comment}</p>
        {/* <p>Posted at {post.createdAt.slice(11, 16)} on {post.createdAt.slice(0, 10)} by {post.author}</p> */}
        <p className="comment-time-text"> by {comment.author}</p>
        {/* <>{post.comments.forEach((comment) => <p>{comment.comment}</p> ) }</> */}
      </article>
    </div>
    
  )
}

export default Comment;