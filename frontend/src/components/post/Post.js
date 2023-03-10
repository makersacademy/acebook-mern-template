import React from "react";
import { formatDistanceToNow } from "date-fns";

const Post = ({ post }) => {
  const createdAt = new Date(post.createdAt);
  const result = formatDistanceToNow(createdAt, { addSuffix: true });

  return (
    <article data-cy="post" key={post._id}>
      Post from {post.user.name}: {post.message} ({result})
    </article>
  );
};

export default Post;
