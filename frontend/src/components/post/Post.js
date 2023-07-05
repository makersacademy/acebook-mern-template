import React from "react";

const Post = ({ post }) => {
  return (
    <article className="post-container" data-cy="post" key={post._id}>
      <div className="username">{post.username}</div>
      <div className="time">{post.time}</div>
      <div className="message">{post.message}</div>
    </article>
  );
};

export default Post;
