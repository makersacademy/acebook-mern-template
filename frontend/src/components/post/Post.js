import React from "react";
import Comments from "../comments/Comments";
import Hates from "../hates/Hates";
import "./Post.css";

const Post = ({ post }) => {
  return (
    <article data-cy="post" key={post._id}>
      <div class="header-container">
        {/* <img
          class="profile-image"
          src={post.author.profilePic}
          alt="https://avatarfiles.alphacoders.com/654/thumb-1920-65419.jpg"
        /> */}
        <div class="name-and-time-container">
          {/* <div class="username">{post.author.usersName}</div> */}
          <div class="post-time">{"{ Post time }"}</div>
        </div>
      </div>

      <div class="message-container">
        <div class="message">{post.message}</div>
      </div>

      <div class="post-image-container">
        <img class="post-image" src={post.imageURL} alt="kyle" />
      </div>

      <Hates />
      <Comments />
    </article>
  );
};

export default Post;
