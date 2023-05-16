import React, { useState } from 'react';
import Like from '../like/Like'

const Post = ({post}) => {
  var date = new Date(post.createdDateTime); 
  var formattedDate = date.toUTCString()

  return(
    <>
    <article data-cy="post" key={ post._id }>{ post.message } { formattedDate }</article>
    <Like likes={post.likes} post_id={ post._id } didUserLikeThis={post.didUserLikeThis}/>
    </>
  )
}

export default Post;
