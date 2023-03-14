import React from "react";
import { formatDistanceToNow } from "date-fns";
import "./Post.css";

const Post = ({ post }) => {
  const createdAt = new Date(post.createdAt);
  const result = formatDistanceToNow(createdAt, { addSuffix: true });

  return (
    <article data-cy="post" key={post._id} className="post-container">
      Post from {post.user.name}: {post.message} ({result})
    </article>
  );
};

export default Post;
