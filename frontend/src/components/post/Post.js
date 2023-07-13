import React from "react";
import "./Post.css";

const formatDate = (date) => {
  // Implement your date formatting logic here
  return new Date(date).toLocaleDateString();
};

const Post = ({ post }) => {
  return (
    <article className="post" key={post._id}>
      <div className="post-header">
        <div>
          {post.user.photo && (
            <img
              className="feed-profile-photo"
              src={`/profilePhotos/${post.user.photo}`}
              alt="Profile photo"
            />
          )}
        </div>
        <span className="post-username">
          <a href={"/users/" + post.user._id}>{post.user.email}</a>
        </span>
        <span className="post-date">{formatDate(post.created_at)}</span>
      </div>
      <div className="post-content">
        <p className="post-message">{post.message}</p>
        {post.photo && (
          <img
            className="post-image"
            src={`/uploads/${post.photo}`}
            alt="Post"
          />
        )}
      </div>
      <div className="post-footer">
        <a className="post-link" href={`/posts/${post._id}`}>
          View post
        </a>
      </div>
    </article>
  );
};

export default Post;
