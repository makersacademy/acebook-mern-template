import React from 'react';
import { Link } from 'react-router-dom';

const Post = ({post}) => {
  const updateLink = `/posts/${post._id}/update`;

  return(
    <article data-cy="post" key={ post._id }>
      { post.message }
      <Link to={updateLink} id="update-link">Update post</Link>
    </article>
  )
}

export default Post;
