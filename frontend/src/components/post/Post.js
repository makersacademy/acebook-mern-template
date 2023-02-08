import React from 'react';

const Post = ({post}) => {
  console.log('posts page')
  return(
    <div>
      <article data-cy="post" key={ post._id }>{ post.message }</article>
    </div>
  )
}

export default Post;
