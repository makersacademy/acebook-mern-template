import React from 'react';
import './Post.css'

const Post = ({post}) => {
  return(
    <div className='post-card'>
      <article data-cy="post" key={ post._id }>{ post.message }</article>
    </div>
  )
}

export default Post;