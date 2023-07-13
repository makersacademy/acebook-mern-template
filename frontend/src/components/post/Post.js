import React, { useEffect, useState } from "react";
import "./Post.css";
import CreateLike from "../createLike/CreateLike";


const formatDate = (date) => {
  // Implement your date formatting logic here
  return new Date(date).toLocaleDateString();
};


const Post = ({ post }) => {

  return (
    <>
    <article className="post" key={post._id}>
      <div className="post-header">
        <span className="post-username">{post.user.email}</span>
        <span className="post-date">{formatDate(post.created_at)}</span>
      </div>
      <div className="post-content">
        <p className="post-message">{post.message}</p>
        {post.photo && (
          <img className="post-image" src={`/uploads/${post.photo}`} alt="Post" />
        )}
      </div>
      <div className="post-likes">
       <p className="likes-count">Likes: {post.likes.length}</p>
      </div>
      <div id="like" >
          <CreateLike/>
        </div>
      <div className="post-footer">
        <a className="post-link" href={`/posts/${post._id}`}>View post</a>
      </div>
    </article>
    </>
  );
};

export default Post;
