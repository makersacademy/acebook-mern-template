import React from 'react';

const Post = ({post, show}) => {
  return(
    <article data-cy="post" key={ post._id }>
      { show === "message" ? post.message : post.author }
    </article>
  )
}

export default Post;
