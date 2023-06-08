import React from 'react';

const Post = ({post}) => {
  const formattedDate = new Date(post.time).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: 'numeric',
  });
  
  return(
    <article data-cy="post" key={ post._id }> 
      <p>{ formattedDate } </p>
      <p>{ post.message }</p>
    </article>
  )
};

export default Post;
