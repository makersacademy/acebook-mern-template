import React from 'react';
import AddComment from '../AddComment/AddComment';

const Post = ({post}) => {
  return (
    <>
      <article data-cy="post" key={post._id}>{post.message}</article>
      <AddComment post={ post } />
    </>
    
  )
}

export default Post;
