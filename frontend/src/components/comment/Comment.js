import React from 'react';
const Comment = ({comment}) => {
  return (
    <>
      <div className="comment-container" data-cy='comment-container'>
        <p>{comment.username}</p>
        <article data-cy='comment' key={ comment._id}>{comment.message}</article>
      </div>
    </>
  )
}
export default Comment;