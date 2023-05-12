import React, { useState } from 'react';
import './Like.css';

const Like = ({likes, didUserLikeThis, post_id}) => {

  let symbol_to_display, function_to_implement;
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [currentLikes, setCurrentLikes] = useState(likes)
  const [isLiked, setIsLiked] = useState(didUserLikeThis)

  const handleLike = async () => {
    fetch('/posts/like', {
      method: 'post',
      headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'},
      body: JSON.stringify({ post_id: post_id, token: token })
      })
    .then(response => response.json())
    .then(async data => {
      window.localStorage.setItem("token", data.token)
      setToken(window.localStorage.getItem("token"))
      setCurrentLikes(data.likes)
      setIsLiked(true)
    })
  }

  const handleUnlike = () => {
    fetch('/posts/unlike', {
      method: 'post',
      headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'},
      body: JSON.stringify({ post_id: post_id, token: token })
      })
    .then(response => response.json())
    .then(async data => {
      window.localStorage.setItem("token", data.token)
      setToken(window.localStorage.getItem("token"))
      setCurrentLikes(data.likes)
      setIsLiked(false)
    })
  }

  if (isLiked) {
    symbol_to_display = "👎"
    function_to_implement = handleUnlike
  } else {
    symbol_to_display = "👍"
    function_to_implement = handleLike
  }

  return (
    <>
    <button onClick={function_to_implement} className="like-button">{symbol_to_display}</button><p className="like-amount">Likes: {currentLikes}</p>
    </>
    )
}

export default Like;
