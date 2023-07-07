import React from 'react';
import '../../index.css'

const Post = ({post}) => {

  console.log(post.createdAt);
  return(
    <article className="posts" 
    data-cy="post" 
    key={ post._id }>{ post.message }
          <p className="post-time">Posted on: {new Date(post.createdAt).toLocaleDateString()} at {new Date(post.createdAt).toLocaleTimeString()}</p>
    </article>
  )
  
}

export default Post;
