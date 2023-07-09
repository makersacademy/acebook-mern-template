import React, { useState, useEffect } from "react";

const CommentLikeForm = ({ token, commentId, onNewLike }) => {
  const [liked, setLiked] = useState(false); // Track whether the user has liked the post

  useEffect(() => {
    const checkIfLiked = async () => {
      try {
        const response = await fetch(`/commentlikes/${commentId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setLiked(data.liked);
      } catch (error) {
        console.error("Error checking if liked:", error);
      }
    };

    checkIfLiked();
  }, [token, commentId]);

  const handleLike = async () => {
    try {
      const method = liked ? "delete" : "post";

      await fetch(`/commentlikes`, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ commentId }),
      });

      setLiked(!liked); // Toggle the liked state
      onNewLike(commentId); // Call the onNewLike callback with postId
    } catch (error) {
      console.error("Error liking/unliking post:", error);
    }
  };

  return (
    <>
      <button onClick={handleLike}>
        <span role="img" aria-label="like">
          {liked ? "👍" : "👍"}
        </span>
      </button>
    </>
  );
};

export default CommentLikeForm;