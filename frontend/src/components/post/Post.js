import React from 'react';

const Post = ({post}) => {
  return(
    <article data-cy="post" key={ post._id }>{ post.message }</article>
  )
}

// {"_id": token, "message": string}

export default Post;
