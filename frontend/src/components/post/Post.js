import React from 'react';

const Post = ({post, onLike}) => {
  const handleLike = () => {
    onLike(post._id);
  };

  return (
    <article data-cy="post" key={ post._id }>
      { post.message }  
      <button onClick={handleLike}>👍 | { post.like }</button>
    </article>
  )
}

export default Post;
