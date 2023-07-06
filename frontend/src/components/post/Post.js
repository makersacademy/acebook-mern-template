import React from "react";

const Post = ({ post }) => {
  console.log(post);
  return (
    <div className="post-container" data-cy="post" key={post._id} id={post._id}>
      <div className="username">{post.username}</div>
      <div className="time">{post.time}</div>
      <div className="message">{post.message}</div>
      <div className="comments">{post.comments}</div>
      <form className="post-form">
        <input type="submit" value="Comment"></input>
        <input type="text" id="name" name="name" required></input>
      </form>
      {/* <input type="text"></input> */}
    </div>
  );
};

export default Post;
