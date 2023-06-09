import React from 'react';

const Post = ({post}) => {

  console.log(post);

  const formattedDate = new Date(post.time).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: 'numeric',
  });
  
  return(
    <article data-cy="post" key={ post._id }> 
      <p>{ post.user.name }</p>
      <p>{ formattedDate } </p>
      <p>{ post.message }</p>
    </article>
  )
};

export default Post;
