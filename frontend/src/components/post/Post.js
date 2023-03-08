import React from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const Post = ({ post }) => {
  const formattedDate = formatDistanceToNow(new Date(date), {
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

// const result = formatDistanceToNow(
//   new Date(2015, 0, 1, 0, 0, 15),
//   {includeSeconds: true}
