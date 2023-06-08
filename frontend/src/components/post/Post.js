import React from 'react';

const Post = ({post}) => {
  return(
    <article data-cy="post" key={ post._id }> 
      <p>{ post.time } </p>
      <p>{ post.message }</p>
    </article>
  )
}

export default Post;
