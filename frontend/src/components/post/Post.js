import React from 'react';
import AddComment from '../AddComment/AddComment';
import './Post.css';

const Post = ({post}) => {
  return (
    <div className='postbox postflex'>
      <article data-cy="post" key={post._id}>{post.message}</article>
      <AddComment post={ post } />
    </div>
    
  )
}

export default Post;
