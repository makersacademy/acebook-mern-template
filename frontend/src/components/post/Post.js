import React, { useState } from 'react';
import Like from '../like/Like'

const Post = ({post}) => {

  return(
    <>
    <h3>{ post.author.userName }</h3>
    {console.log(post.author.userName)}
    <article data-cy="post" key={ post._id }>{ post.message }</article>
    <Like likes={post.likes} post_id={ post._id } didUserLikeThis={post.didUserLikeThis}/>
    </>
  )
}

export default Post;
