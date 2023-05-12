import React from "react";
import { useState } from "react";
import PropTypes from 'prop-types';

const Like = ( { postId } ) => {

  Like.propTypes = {
    postId: PropTypes.string.isRequired,
  };

  const [likeCount, setLikeCount] = useState(0);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const handleLikeClick = async (event) => {
    event.preventDefault();

    let response = await fetch(`/posts/${postId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    const data = await response.json();
    setLikeCount(data.likeCount);
    setToken(window.localStorage.getItem("token")); // Update token
  }

  return (
    <div>
    <button onClick={handleLikeClick}> 
      LIKE
    </button>
    <p>{likeCount} likes</p>
  </div>
  )
}

export default Like;