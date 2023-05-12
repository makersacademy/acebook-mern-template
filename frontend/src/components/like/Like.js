import React, { useEffect } from "react";
import { useState } from "react";

const Like = ( { postId, likesCount } ) => {

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
    setLikeCount(data.post.likeCount);
    setToken(window.localStorage.getItem("token")); // Update tokendfdf

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
