import React, { useState, useEffect } from "react";

const PostLikeForm = ({ token, postId, liked, setLiked }) => {
  useEffect(() => {
    const checkIfLiked = async () => {
      try {
        const response = await fetch(`/postlikes/${postId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.likes) setLiked(true);
      } catch (error) {
        console.error("Error checking if liked:", error);
      }
    };

    checkIfLiked();
  }, [token, postId]);

  const handleLike = async () => {
    try {
      const method = liked ? "delete" : "post";

      await fetch(`/postlikes`, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId }),
      });

      setLiked(!liked); // Toggle the liked state
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

export default PostLikeForm;
