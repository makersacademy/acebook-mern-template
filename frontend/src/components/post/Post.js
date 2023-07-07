import React from "react";

const Post = ({ post }) => {
  return (
    <article data-cy="post" key={post._id}>
      {post.message}
      <br />
      {/* Posted by: {post.user.email} */}
      <br />
      <a href={`/posts/${post._id}`}>View post</a>
      <br />
      <br />
    </article>
  );
};


export default Post;