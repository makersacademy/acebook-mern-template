import React from "react";
import './Post.css'; // import the CSS file

const Post = ({ post }) => {
  if (post.message !== "") { // Quickfix to remove empty submits
    return (
      <article data-cy="post" key={post._id}>
        {post.message}
      </article>
    );
  }
  return null;
};

export default Post;
