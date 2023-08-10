import React, { useState, useEffect } from "react";
import Comment from "../comment/Comment";
import "./Post.css";

const Post = ({ post, setPosts, newPosts, setSearchQuery }) => {
  let comments = post.comments;
  let commentList = comments?.map((comment) => (
    <p>
      {" "}
      <Comment comment={comment} key={comment._id} />{" "}
    </p>
  ));
 
  const userid = window.localStorage.getItem("userid");
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [liked, setLiked] = useState(post?.likes?.includes(userid));
  const length = post?.likes?.length;
  const [editedMessage, setEditedMessage] = useState(post.message);
  const [likesCount, setLikesCount] = useState(length);
  const handleLike = async () => {
    try {
      const response = await fetch(`posts/${post._id}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      });

      if (response.status === 201) {
        const data = await response.json();

        setLiked(true);
        setLikesCount(data.likes.length);
        fetch("/posts", {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }).then(async (response) => {
          if (response.status === 200) {
            let data1 = await response.json();
            let UpdatedPosts = data1.posts;
            setPosts(UpdatedPosts);
          } else {
          }
        });

        
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = () => {
    fetch(`/posts/${post._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log("Response status:", response.status);
        if (response.status === 200) {
          fetch("/posts", {
            method: "get",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }).then(async (response) => {
            if (response.status === 200) {
              let data1 = await response.json();
              let UpdatedPosts = data1.posts;
              setPosts(UpdatedPosts);
              setSearchQuery(UpdatedPosts);
              console.log(UpdatedPosts)
            } else {
            }
          });
        } else if (response.status === 403) {
          console.error("You are not allowed to delete this post.");
        } else {
          console.error("Error deleting a post");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const [isEditing, setIsEditing] = useState(false);
  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleUpdateClick = async () => {
    try {
      const response = await fetch(`/posts/${post._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: editedMessage }),
      });

      if (response.status === 200) {
        setIsEditing(false);
        // Update the post message in the posts state
        setPosts((prevPosts) =>
          prevPosts.map((editedPost) => (
            editedPost._id === post._id ? { 
              ...editedPost, message: editedMessage 
            } 
            : editedPost))
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const showEditButton = post.user._id === userid;


  const showDeleteButton = post.user._id === userid;
  
  if (post.user === null) {
    return (
      <article data-cy="post">
        {" "}
        <p>ERROR</p>
      </article>
    );
  } else {
    return (
      <article data-cy="post">
        <div className="post" key={post._id}>
          <div className="username-box">
            <span className="username">{post.user.username}</span>
          </div>
          <p>
            <div className="post-box">
              <span className="post-message">{post.message}</span>
            </div>
          </p>
          {comments && comments.length > 0 && (
            <div className="comments-box">
              <ul className="comments-list">
                {comments && comments.map((comment, index) => (
                  <li className="comment" key={index}>
                    <div className="comment-username-box">
                      <div className="comment-user">
                        <span className="username">{comment.username}</span>
                      </div>
                    </div>
                    <div className="comment-content">{comment.comment}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <button
            className="like-button"
            onClick={handleLike}
            disabled={liked}
            title={liked ? "You liked this post" : "Like this post"}
          >
      {liked ? "🤍" : "❤️"}
      {likesCount > 0 && (
        <span className="like-count">{likesCount}</span>
          )}
        </button>

        {showEditButton && !isEditing && (
          <button
            className="edit-button"
            onClick={handleEditClick}
            title="Edit this post"
          >
            <span className="button-icon">✏️</span>
          </button>
        )}

        {isEditing ? (
          <div className="edit-form">
            <textarea
              value={editedMessage}
              onChange={(e) => setEditedMessage(e.target.value)}
              rows={3}
            />
            <button 
            onClick={handleUpdateClick} 
            className="update-button"
            title="Save changes">✅</button>
          </div>
        ) : null}

          {showDeleteButton && (
            <button
              data-cy="delete-button"
              className="delete-button"
              onClick={() => handleDelete(post._id, token, setPosts)}
              title="Delete this post"
            >
              <span className="button-icon">🗑️</span>
            </button>
          )}
        </div>
      </article>
    );
  }
};

export default Post;
