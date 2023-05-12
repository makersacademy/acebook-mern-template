import React from "react";
import { useState } from "react";

const Like = ( { postId } ) => {
  console.log(postId)
  let like = 0;
  const [likeCount, setLikeCount] = useState(0);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const handleLikeClick = async (event) => {
    event.preventDefault();

    let response = await fetch('/posts/:id', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    setLikeCount(likeCount + 1);
    const data = await response.json();
    setLikeCount(data.likeCount);
  }

  return (
    <button onClick={handleLikeClick}> 
      LIKE
    </button>
  )
}

export default Like;