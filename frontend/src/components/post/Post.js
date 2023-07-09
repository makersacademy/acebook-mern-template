import React, { useEffect, useState } from "react";

const Post = ({ post, token }) => {
  const [imgSrc, setImgSrc] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleZoom = () => {
    setIsZoomed(true);
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

  return (
    <div className="post-container" data-cy="post" key={post._id} id={post._id}>
      <div className="username">{post.username}</div>
      <div className="time">{post.time}</div>
      <div className="message">{post.message}</div>
      {imgSrc && (
        <div className={`post-image-container ${isZoomed ? "zoomed" : ""}`}>
          <img
            className="post-image"
            src={imgSrc}
            alt="Post Image"
            onClick={handleZoom}
          />
          {isZoomed && (
            <div className="zoomed-image-container">
              <img
                className="zoomed-image"
                src={imgSrc}
                alt="Zoomed Post Image"
              />
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

      <div className="comments">{post.comments}</div>
      {/* <input type="text"></input> */}
    </div>
  );
};

export default Post;
