import React from 'react';

const Post = ({post}) => {
  return(
    <article data-cy="post" key={ post._id }>{ post.title }{ post.content }{ post.photo }</article>
  )
}

export default Post;
