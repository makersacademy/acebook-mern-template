import React from 'react';

const Post = ({post}) => {
  return(
    <article data-cy="post" key={ post._id }>{ post.title }<br></br>{ post.content }<br></br>{ post.photo }</article>
  )
}

export default Post;
