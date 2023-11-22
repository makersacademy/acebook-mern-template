import React from "react";
import MessageHeader from "../messageHeader/MessageHeader";
import CommentFeed from "../commentFeed/CommentFeed";


const Post = ({ post }) => {
  return (
    <article data-cy="post" key={post._id}>
      <MessageHeader user_id={post.user_id}/>
      {post.message}
      The post id is {post.user_id}
      <br></br>
      <article data-cy="comment">
        <CommentFeed post_id={post._id} />
      </article>
    </article>
  );
};

export default Post;
