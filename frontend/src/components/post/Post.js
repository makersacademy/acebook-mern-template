import React from 'react';
import { Link } from 'react-router-dom';

const Post = ({post}) => {
  const viewPost = `/posts/${post._id}`;

  return(
    <article data-cy="post" key={ post._id }>
      { post.message }
      <Link to={viewPost} id="view-post-link">View post</Link>
    </article>
  )
}

export default Post;
