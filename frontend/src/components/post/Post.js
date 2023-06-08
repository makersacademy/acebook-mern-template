import React from 'react';

const Post = ({post}) => {
  return(
    <article data-cy="post" key={ post._id }>{ post.newPost }</article>
  )
}

export default Post;
