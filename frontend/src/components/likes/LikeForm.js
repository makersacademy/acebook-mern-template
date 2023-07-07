import React, { useState } from "react";

const LikeForm = (props) => {
  const [likes, setLikes] = useState(0); // Initialize likes with the existing value or 0

  const handleLike = (event) => {
    event.preventDefault();
    console.log(props.postId);

    fetch(`/posts/${props.postId}/like`, {
      method: "post",
      headers: {
        Authorization: `Bearer ${props.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: props.token,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response data:", data);
        setLikes(likes + 1);
      });
  };

  return (
    <>
      <div className="likes">Likes: {likes}</div>{" "}
      {/* Display the likes count */}
      <button onClick={handleLike}>
        {/* Use an emoji, such as a thumbs-up */}
        <span role="img" aria-label="like">
          👍
        </span>
      </button>
    </>
  );
};

export default LikeForm;
