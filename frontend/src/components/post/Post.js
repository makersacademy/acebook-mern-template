import React from 'react';
import { Link } from 'react-router-dom';

const Post = ({post}) => {
  const updateLink = `/posts/${post._id}/update`;
  const deleteLink = `/posts/${post._id}/delete`;

  return(
    <article data-cy="post" key={ post._id }>
      { post.message }
      <Link to={deleteLink}>Delete post</Link>
      <Link to={updateLink} id="update-link">Update post</Link>
    </article>
  )
}

export default Post;
