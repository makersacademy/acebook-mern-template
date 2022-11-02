import React from 'react';
import './Post.css';

const Post = ({post}) => {
  return(
    <article id='singlePost' data-cy="post" key={ post._id }></article>
  )
}

export default Post;



 
