import React from "react";

const Post = ({ post }) => {
  return (
    <div>
      <article data-cy="post" key={post._id}>
        {post.message}
      </article>
      <article data-cy="post" key={post._id}>
        {new Date(post.time).toString().slice(0, 28)}
      </article>
    </div>
  );
};

export default Post;
