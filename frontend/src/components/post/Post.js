import React from "react";
import PropTypes from 'prop-types';
import Like from '../like/Like';
import './Post.css'; // import the CSS file

const Post = ({ post }) => {
  Post.propTypes = {
    post: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      likeCount: PropTypes.number.isRequired,
    }).isRequired,
  };

  return (
    <article data-cy="post" key={post._id}>
      {post.message}

      <Like postId={post._id} likesCount={post.likeCount}/>
    </article>
  );
};

export default Post;
