import React from 'react';

const Post = ({post}) => {
  return(
    <article data-cy="post" key={ post._id }>
      <p>{ post.message }</p>
      <p>Posted at { post.createdAt.slice(11, 16) } on { post.createdAt.slice(0, 10) }</p>
      <p>By  { post.author }</p>
    </article>
  )
}

export default Post;
