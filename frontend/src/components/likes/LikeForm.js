import React, { useState } from "react";

const LikeForm = ({ token, postId, onNewLike }) => {
  const [liked, setLiked] = useState(false); // Track whether the user has liked the post

  const handleLike = async () => {
    try {
      if (!liked) {
        await fetch(`/likes`, {
          method: "post",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });
        setLiked(true); // Set liked state to true when like is successful
        onNewLike(postId); // Call the onNewLike callback to update the likes count
      } else {
        await fetch(`/likes/${postId}/unlike`, {
          method: "post",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });
        setLiked(false); // Set liked state to false when unlike is successful
        onNewLike(postId); // Call the onNewLike callback to update the likes count
      }
    } catch (error) {
      console.error("Error liking/unliking post:", error);
    }
  };

  return (
    <>
      <button onClick={handleLike}>
        <span role="img" aria-label="like">
          👍
        </span>
      </button>
    </>
  );
};

export default LikeForm;
