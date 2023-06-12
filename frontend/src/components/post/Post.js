import React from 'react';

const Post = ({post}) => {
  return(
    <>
    <p>{ post.username }</p>
    <article data-cy="post" key={ post._id }>{ post.message }</article>
    </>
  )
}

export default Post;
