import React from "react";
import { useState } from "react";

const Like = ( { postId, likesCount, liked } ) => {

  const [likeCount, setLikeCount] = useState(likesCount); // declare likeCount before initializing it
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const handleLikeClick = async () => {

    let response = await fetch(`/posts/${postId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    const data = await response.json();
    console.log(data)
    setLikeCount(data.likeCount);
    setToken(window.localStorage.getItem("token")); // Update token
    // liked();
  }

  return (
    <div>
    <button onClick={handleLikeClick}> 
      LIKE
    </button>
    <p>{likeCount} likes</p> {/* use the likeCount state variable */}
  </div>
  )
}

export default Like;
