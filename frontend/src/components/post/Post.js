import React from "react";
import "./Post.css";
import CreateLike from "../createLike/CreateLike";
import { Link } from "react-router-dom";

const formatDate = (date) => {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("en-GB", options);
};

const Post = ({ post, handleRefresh }) => {
  return (
    <article className="post" key={post._id}>
      <div className="post-header">
        <div className="username">
          {post.user.photo && (
            <a href={"/users/" + post.user._id}>
              <img
                className="feed-profile-photo"
                src={`/profilePhotos/${post.user.photo}`}
                alt="Profile photo"
              />
            </a>
          )}

          <a href={"/users/" + post.user._id}>{post.user.username}</a>
        </div>

        <div className="post-date">{formatDate(post.created_at)}</div>
      </div>

      <div className="post-content">
        <Link to={"/posts/" + post._id}>
          <p className="post-message">{post.message}</p>
          {post.photo && (
            <img
              className="post-image"
              src={`/uploads/${post.photo}`}
              alt="Post"
            />
          )}
        </Link>
      </div>
      <div className="post-likes">
        <p className="likes-count">Likes: {post.likes.length}</p>
      </div>
      <div id="like">
        <CreateLike postId={post._id} handleRefresh={handleRefresh} />
      </div>
    </article>
  );
};

export default Post;
