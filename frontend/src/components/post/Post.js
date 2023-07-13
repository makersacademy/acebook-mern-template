import React, { useEffect, useState } from "react";
import CommentForm from "../comment/CommentForm";
import Comment from "../comment/Comment";

const Post = ({
  post,
  token,
  onUpdatedLikes,
  handleNewComment,
  comments,
  handleUpdatedCommentLikes,
}) => {
  const [imgSrc, setImgSrc] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [authorImgSrc, setAuthorImgSrc] = useState(null);
  const [liked, setLiked] = useState(false);

  const handleZoom = () => {
    setIsZoomed(true);
  };

  const handlePostLike = async () => {
    setLiked(!liked);
    console.log("handleLike is triggered");
    const response = await fetch(`/posts/${post._id}/like`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (onUpdatedLikes) {
      onUpdatedLikes(post._id, data.likes);
    }
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

  return (
    <div className="post-wrapper">
      <div className="author-details">
        <div className="author">
          <img className="author-image" src={authorImgSrc} alt="Author" />
        </div>
        <div className="text-details">
          <div className="username">@{post.username}</div>
          <div className="time">{post.time}</div>
        </div>
      </div>
      <div className="post-content">
        <div className="message">{post.message}</div>
        <div className="interactive-area">
          <button className="like-button" onClick={handlePostLike}>
            <svg
              className={`like-icon ${liked ? "liked" : ""}`}
              viewBox="0 0 20 20"
            >
              <path d="M9.719,17.073l-6.562-6.51c-0.27-0.268-0.504-0.567-0.696-0.888C1.385,7.89,1.67,5.613,3.155,4.14c0.864-0.856,2.012-1.329,3.233-1.329c1.924,0,3.115,1.12,3.612,1.752c0.499-0.634,1.689-1.752,3.612-1.752c1.221,0,2.369,0.472,3.233,1.329c1.484,1.473,1.771,3.75,0.693,5.537c-0.19,0.32-0.425,0.618-0.695,0.887l-6.562,6.51C10.125,17.229,9.875,17.229,9.719,17.073 M6.388,3.61C5.379,3.61,4.431,4,3.717,4.707C2.495,5.92,2.259,7.794,3.145,9.265c0.158,0.265,0.351,0.51,0.574,0.731L10,16.228l6.281-6.232c0.224-0.221,0.416-0.466,0.573-0.729c0.887-1.472,0.651-3.346-0.571-4.56C15.57,4,14.621,3.61,13.612,3.61c-1.43,0-2.639,0.786-3.268,1.863c-0.154,0.264-0.536,0.264-0.69,0C9.029,4.397,7.82,3.61,6.388,3.61"></path>
            </svg>
            <span className="like-count">
              {post.likes ? post.likes.length : 0}
            </span>
          </button>
        </div>
      </div>

      <div
        className="post-container"
        data-cy="post"
        key={post._id}
        id={post._id}
      >
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
        <CommentForm
          token={token}
          onNewComment={handleNewComment}
          postId={post._id}
        />

        <div id="comment-feed">
          {comments &&
            comments
              .filter((comment) => comment.postId === post._id)
              .map((comment) => (
                <div key={comment._id}>
                  <Comment
                    comment={comment}
                    onNewComment={handleNewComment}
                    token={token}
                    handleUpdatedCommentLikes={handleUpdatedCommentLikes}
                  />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Post;
