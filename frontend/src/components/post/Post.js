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

  const handleZoom = () => {
    setIsZoomed(true);
  };

  const handlePostLike = async () => {
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

  console.log(comments);
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
      <button onClick={handlePostLike}>
        <span role="img" aria-label="like">
          {"👍"}
        </span>
      </button>
      <div>{post.likes ? post.likes.length : 0} likes</div>

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
          {comments
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
