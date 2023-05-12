import React from "react";
import Like from '../like/Like'
import './Post.css'; // import the CSS file

const Post = ({ post }) => {
  return (
    <article data-cy="post" key={post._id}>
      {post.message}

      <Like postId={post._id}/>
    </article>
  );
};

export default Post;
