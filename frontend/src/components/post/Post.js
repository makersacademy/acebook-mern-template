import React from 'react';

const Post = ({post}) => {
  console.log('posts page')
  return(
    <article data-cy="post" key={ post._id }>{ post.message }</article>
  )
}

export default Post;
