import React from "react";
import CommentFeed from "../commentFeed/CommentFeed";

const Post = ({ post }) => {
  return (
    <article data-cy="post" key={post._id}>
      {post.message}
      <br></br>
      <article data-cy="comment">
        <CommentFeed post_id={post._id} />
      </article>
    </article>
  );
};

export default Post;
