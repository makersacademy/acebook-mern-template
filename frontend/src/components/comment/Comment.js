import React from 'react';
const Comment = ({comment}) => {
  return (
    <article data-cy='comment' key={ comment._id}>{ comment.message}</article>
  )
}
export default Comment;