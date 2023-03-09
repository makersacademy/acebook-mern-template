import React from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

// const newPost = {
//   time: Date.now(),
//   ...post,
// };
const Post = ({ post }) => {
  // const formattedDate = formatDistanceToNow(new Date(), {
  //   addSuffix: true,
  // });

  return (
    <article data-cy="post" key={post._id}>
      {post.message}
      Published {post.time}
    </article>
  );
};

export default Post;
