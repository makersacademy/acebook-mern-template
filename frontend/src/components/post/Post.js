import React from "react";

const Post = ({ post }) => {
  return (
    <article data-cy="post" key={post._id}>
      Post from {post.user}:{post.message}
    </article>
  );
};

export default Post;
