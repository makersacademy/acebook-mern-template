import React from "react";
import AddComment from "../AddComment/AddComment";
import Comment from "../comment/Comment";
import "./Post.css";
import Avatar from "@mui/material/Avatar";

const Post = ({ post }) => {
  return (
 
    <div className="postbox postflex">
      <Avatar
        alt="Remy Sharp"
        src={ post.avatar }
        sx={{ width: 56, height: 56 }}
      />
      <article data-cy="post" key={post._id}>
        <p className="post-text">{post.message}</p>
        { <p className="time-text">
          Posted at {post.createdAt.slice(11, 16)} on{" "}
          {post.createdAt.slice(0, 10)} by {post.author}
        </p> }
        <div className="break-line"></div>
        {post.comments.map((comment, index) => (
          <Comment comment={comment} key={index} />
        ))}
        <div className="add-comment">
          <AddComment post={post} />
        </div>
      </article>
    </div>
  );
};

export default Post;
