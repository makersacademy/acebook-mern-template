import React from "react";
import PropTypes from "prop-types";

const Post = ({ post }) => {
  return (
    <article data-cy="post" key={post._id}>
      {post.message}
    </article>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.number,
    message: PropTypes.string,
  }).isRequired,
};

export default Post;
