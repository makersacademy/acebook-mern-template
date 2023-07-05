import React from "react";

const Post = ({ post }) => {
  return (
    <article data-cy="post" key={post._id}>
      <div>
        {post.username} {post.time} {post.message}
      </div>
    </article>
  );
};

export default Post;
