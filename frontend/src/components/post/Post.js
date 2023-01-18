import React, { useState, useEffect } from "react";
import "./Post.css";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { Link } from "react-router-dom";

const Post = ({ post, setUpdated }) => {
  const [showLikers, setShowLikers] = useState(false);
  const [likers, setLikers] = useState([]);
  const token = window.localStorage.getItem("token");
  const isLiked = post.likes.includes(window.localStorage.getItem("user_id"));

  const handleLike = async (e) => {
    e.preventDefault();

    const method = isLiked ? "unlike" : "like";

    let response = await fetch(`/posts/${method}/${post._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 201) {
      setUpdated(true);
    }
  };

  useEffect(() => {
    const fetchLikers = async () => {
      const response = await fetch(`/posts/likers/${post._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setLikers(data.likers);
    };
    fetchLikers();
  }, [isLiked]);

  return (
    <div className="post-container">
      <div className="post-card" data-cy="post" key={post._id}>
        <div className="card-header">
          <div className="card-meta">
            <Link to={`/users/${post.author._id}`} style={{margin: "0"}}>
              <h2 className="username">{post.author.name}</h2>
            </Link>
            <p className="timestamp">
              {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
        <p className="card-message">{post.message}</p>
        <div className="like-container">
          <button className="like-button" onClick={handleLike}>
            {isLiked ? <AiFillLike size={20} /> : <AiOutlineLike size={20} />}
          </button>
          <div
            className="like-count"
            onMouseEnter={() => setShowLikers(true)}
            onMouseLeave={() => setShowLikers(false)}
          >
            {post.likeCount}
          </div>
          {showLikers && (
            <div className="liker-list">
              {likers.length > 0 ? (
                likers.map((liker) => <p key={liker._id}>{liker.name}</p>)
              ) : (
                <p>No likes</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
