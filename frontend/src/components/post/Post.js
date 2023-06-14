import React from 'react';
import { Link } from 'react-router-dom';

const Post = ({post}) => {
  const viewPost = `/posts/${post._id}`;
  const deleteLink = `/posts/${post._id}/delete`;

  return(
    <article data-cy="post" key={ post._id }>
      { post.message }
      <Link to={viewPost} id="view-post-link">View post</Link>
      <Link to={deleteLink} id="delete-link">Delete post</Link>
    </article>
  )
}

export default Post;
