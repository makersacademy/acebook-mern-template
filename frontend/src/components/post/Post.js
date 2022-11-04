import React from "react";

const Post = ({ post }) => {
  return (
    <article data-cy="post" key={post._id}>
      {post.message}
      {post.image}
    </article>
  );
};

export default Post;
