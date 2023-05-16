import React, { useState } from 'react';
import Like from '../like/Like'
import DataURLToJPGConverter from '../DataURLToJPGConverter/DataURLToJPGConverter';

const Post = ({post}) => {
  var date = new Date(post.createdDateTime);
  var formattedDate = date.toUTCString()
  return(
    <>
    <h3>{ post.author.userName }</h3>
    <DataURLToJPGConverter dataURL={post.author.photo}/>
    <article data-cy="post" key={ post._id }>{ post.message } { formattedDate } </article>
    <Like likes={post.likes} post_id={ post._id } didUserLikeThis={post.didUserLikeThis}/>
    </>
  )
}

export default Post;
