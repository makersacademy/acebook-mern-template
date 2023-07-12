import React, { useEffect, useState } from "react";
import PostLike from "../likes/PostLike";
import PostLikeForm from "../likes/PostLikeForm";
import CommentForm from "../comment/CommentForm";
import Comment from "../comment/Comment";

const Post = ({ post, token, setToken, likes, onUpdatedLikes }) => {
  const [imgSrc, setImgSrc] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [authorImgSrc, setAuthorImgSrc] = useState(null);
  const [comments, setComments] = useState([]);

  const handleZoom = () => {
    setIsZoomed(true);
  };

  const handleLike = async () => {
    console.log("handleLike is triggered");
    const response = await fetch(`/posts/${post._id}/like`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    onUpdatedLikes(post._id, data.likes); // Use the function passed as a prop
  };

  useEffect(() => {
    if (post._id && post.image && post.image.data) {
      // Check if the post has image data
      fetch(`/posts/image/${post._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.blob())
        .then((blob) => {
          const objectURL = URL.createObjectURL(blob);
          setImgSrc(objectURL);
        });
    }
  }, [post, token]);

  useEffect(() => {
    const fetchComments = async () => {
      if (token && token !== "null" && token !== "undefined") {
        const response = await fetch("/comments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setComments(data.comments.reverse());
      } else {
        setComments([]); // Set empty comments array when there is no token
      }
    };

    fetchComments();
  }, [token]);

  useEffect(() => {
    if (post.authorId) {
      fetch(`/profiles/${post.authorId}/profileImage`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.blob())
        .then((blob) => {
          const objectURL = URL.createObjectURL(blob);
          setAuthorImgSrc(objectURL);
        });
    }
  }, [post, token]);

  const handleNewComment = (comment) => {
    setComments((prevComments) => {
      const newComments = [...prevComments, comment];
      const reversedComments = newComments.reverse();
      return reversedComments;
    });
  };

  return (
    <div>
      <div className="author-details">
        <div className="author">
          <img className="author-image" src={authorImgSrc} alt="Author" />
        </div>
        <div className="text-details">
          <div className="username">@{post.username}</div>
          <div className="time">{post.time}</div>
        </div>
      </div>
      <div className="message">{post.message}</div>
      <button onClick={handleLike}>Like</button>
      <div>{post.likes ? post.likes.length : 0} likes</div>

      <div
        className="post-container"
        data-cy="post"
        key={post._id}
        id={post._id}
      >
        <CommentForm
          token={token}
          onNewComment={handleNewComment}
          postId={post._id}
        />
        <div id="comment-feed">
          {comments
            .filter((comment) => comment.postId === post._id)
            .map((comment) => (
              <div key={comment._id}>
                <Comment comment={comment} />
              </div>
            ))}
        </div>
      </div>
      {imgSrc && (
        <div className={`post-image-container ${isZoomed ? "zoomed" : ""}`}>
          <img
            className="post-image"
            src={imgSrc}
            alt="Post"
            onClick={handleZoom}
          />
          {isZoomed && (
            <div className="zoomed-image-container">
              <img className="zoomed-image" src={imgSrc} alt="Zoomed Post" />
              <button
                className="zoomed-image-close-button"
                onClick={() => setIsZoomed(false)}
              >
                Close
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Post;
