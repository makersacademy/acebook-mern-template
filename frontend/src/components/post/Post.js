import React from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const Post = ({ post }) => {
  const formattedDate = formatDistanceToNow(new Date(), {
    addSuffix: true,
  });
  return (
    <article data-cy="post" key={post._id}>
      {post.message}
      Published {formattedDate}
    </article>
  );
};

export default Post;
