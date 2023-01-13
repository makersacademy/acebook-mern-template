import React from 'react';
import "./Post.css"
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const Post = ({post}) => {
  return(
    <div class="post-container">
  <div class="post-card" data-cy="post" key={ post._id }>
    <div class="card-header">
      <div class="card-meta">
        <h2 class="username">{ post.author.name }</h2>
        <p class="timestamp">{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</p>
      </div>
    </div>
    <p class="card-message">{ post.message }</p>
  </div>
</div>

  )
}

export default Post;
