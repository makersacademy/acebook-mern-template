import React from "react";
import './Post.css'; // import the CSS file

const Post = ({ post }) => {
  return (
    <article data-cy="post" key={post._id}>
      {post.message}
    </article>
  );
};

export default Post;
