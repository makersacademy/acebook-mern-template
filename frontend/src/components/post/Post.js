import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const Post = ({ post }) => {
  return (
    <article data-cy="post" key={post._id}>
      <div>
        <span>User</span>
        <p>
          {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
        </p>
      </div>
      {post.message}
    </article>
  );
};

export default Post;
