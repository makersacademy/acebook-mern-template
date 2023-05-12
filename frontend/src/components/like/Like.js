import React from "react";
import { useState } from "react";
import PropTypes from 'prop-types';

const Like = ( { postId, likesCount } ) => {

  Like.propTypes = {
    postId: PropTypes.string.isRequired,
    likesCount: PropTypes.number.isRequired,
  };

  const [likeCount, setLikeCount] = useState(likesCount); // declare likeCount before initializing it
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
    <p>{likeCount} likes</p> {/* use the likeCount state variable */}
  </div>
  )
}

export default Like;
