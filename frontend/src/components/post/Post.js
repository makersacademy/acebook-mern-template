import React from "react";

const Post = ({ post }) => {
  return (
    <div className="post-container" data-cy="post" key={post._id} id={post._id}>
      <div className="username">{post.username}</div>
      <div className="time">{post.time}</div>
      <div className="message">{post.message}</div>
      {post.image && <img src={post.image} alt="Post Image" />}
      <div className="comments">{post.comments}</div>
      {/* <input type="text"></input> */}
    </div>
  );
};

export default Post;
