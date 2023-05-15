import React, { useState } from 'react';
import Like from '../like/Like'

const Post = ({post}) => {

  return(
    <>
    <article data-cy="post" key={ post._id }>{ post.message }</article>
    <Like likes={post.likes} post_id={ post._id } didUserLikeThis={post.didUserLikeThis}/>
    </>
  )
}

export default Post;
