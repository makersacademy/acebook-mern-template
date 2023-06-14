import React from 'react';

const Comment = ({ comment }) => {

  const formattedDate = new Date(comment.time).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: 'numeric',
  });

  return (
    <article className="comment" data-cy="comment" key={ comment._id }>
      <img className="avatar" src={ process.env.PUBLIC_URL + comment.user.avatar } alt='avatar' width='50'></img> 
      <div>
        <div className="top-container">
          <div className="userName">{ comment.user.name }</div>
          <div className="date">{ formattedDate } </div>
        </div>
        <div className="message">{ comment.message }</div>
      </div>
    </article>
  )
}

export default Comment;