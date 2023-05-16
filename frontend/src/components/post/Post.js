import React from 'react';
import AddComment from '../AddComment/AddComment';
import './Post.css';

const Post = ({post}) => {
  return (
    <div className='postbox postflex'>
      <article data-cy="post" key={post._id}>
      <p>{post.message}</p>
      <p>Posted at { post.createdAt.slice(11, 16) } on { post.createdAt.slice(0, 10) }</p>
      <p>By  { post.author }</p>
      <AddComment post={ post } />
    </article>
    </div>
    
  )
}

export default Post;
