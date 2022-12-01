import React from "react";

const Post = ({ post }) => {
  return (
    <div>
      <article data-cy="post" key={post._id}>{post.message}</article>
      <article data-cy="post" key={post._id}>{post.time}</article>
    </div>
  );
};

export default Post;
