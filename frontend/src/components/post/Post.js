import React, { useState, useEffect } from 'react';
import Comment from "../comment/Comment";
import CreateComment from "../CreateComment/CreateComment";
import "./Post.css"
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { Link } from "react-router-dom";

const Post = ({ post, setUpdated }) => {
  const [showLikers, setShowLikers] = useState(false);
  const [likers, setLikers] = useState([]);
  const [viewComments, setViewComments] = useState(false);
  const token = window.localStorage.getItem("token");
  const isLiked = post.likes.includes(window.localStorage.getItem("user_id"));
  const comments = post.comments;
  const createdBy = post.author;
  
  const handleViewComments = () => {
    if (viewComments === false) {
      setViewComments(true);
    } else if (viewComments === true) {
      setViewComments(false);
    }
  }

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

    if (response.status === 200) {
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

  const handleDelete = async (e) => {
    e.preventDefault();

    let response = await fetch(`/posts/${post._id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.status === 201) {
      setUpdated(true);
    }
  };

  return (
    <div className="post-container">
      <div className="post-card" data-cy="post" key={post._id}>
        <div className="card-header">
          <div className="card-meta">
            <Link to={`/users/${post.author._id}`} className="username-link">
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

        <div className="likes-and-comments-buttons-container">
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
            { comments.length === 0 ?
              <button className="comments-button" onClick={handleViewComments}>Add comment</button> : comments.length === 1 ?
              <button className="comments-button" onClick={handleViewComments}>{ comments.length } comment</button> :
              <button className="comments-button" onClick={handleViewComments}>{ comments.length } comments</button>
            }
            <button className="delete-button" onClick={handleDelete}>Delete</button>
        </div>
        { comments && (viewComments === true) &&
          <div id="comments-container">
            <div className="add-comment-container">
              <CreateComment post_id={post._id} setUpdated={setUpdated} />
            </div>
            {comments.map((comment) => (
              <Comment comment={comment} key={comment._id} />
            ))}
          </div>
        }
      </div>
    </div>
  );
};

export default Post;
