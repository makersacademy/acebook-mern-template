import React from "react";
import AddComment from "../AddComment/AddComment";
import Comment from "../comment/Comment";
import "./Post.css";
import Avatar from "@mui/material/Avatar";
import Likes from '../Likes/Likes';

const Post = ({ post }) => {
  const postPropsForLike = { _id: post._id, type: "post"}
  return (
 
    <div className="postbox postflex">
      <Avatar
        className="post-avatar"
        alt="Remy Sharp"
        src="https://res.cloudinary.com/dmkipvd8d/image/upload/v1684273799/_124800859_gettyimages-817514614_dfpybm.jpg"
        sx={{ width: 50, height: 50 }}
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
        <div className="likes">
          <Likes likers={ post.likes } parent={postPropsForLike} />
        </div>
    </article>
    </div>
  );
};

export default Post;
