import React from "react";
import Post from "./Post";

const SelectedPost = ({ post, token }) => {
  return (
    <div className="selected-post">
      <Post post={post} token={token} />
    </div>
  );
};

export default SelectedPost;
