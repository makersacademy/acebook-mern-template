import React from "react";
import Comments from "../comments/Comments";
import Hates from "../hates/Hates";
import "./Post.css";

const Post = ({ post }) => {
  return (
    <article data-cy="post" key={post._id}>
      <div class="header-container">
        <img
          class="profile-image"
          src="https://iili.io/mVK9G2.png"
          alt="kyle"
        />
        <div class="name-and-time-container">
          <div class="username">{post.author.usersName}</div>
          <div class="post-time">{"{ Post time }"}</div>
        </div>
      </div>

      <div class="message-container">
        <div class="message">{post.message}</div>
      </div>

      <div class="post-image-container">
        <img class="post-image" src={post.imageURL} alt="" />
      </div>

      <Hates />
      <Comments />
    </article>
  );
};

export default Post;
