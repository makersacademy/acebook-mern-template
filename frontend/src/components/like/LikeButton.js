import React from "react";
import { useState } from "react";
import "./Like.css";

const LikeButton = (props) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const handleSubmit = (event) => {
    event.preventDefault()
    fetch(`/api/posts/${props.postId}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ likes: props.userIDList }),
    });


    if (props.userIDList.includes(props.userId)){
      const index = props.userIDList.indexOf(props.userId);
      if (index > -1) { // only splice array when item is found
        props.userIDList.splice(index, 1); // 2nd parameter means remove one item only
      }
    } else {
      props.userIDList.push(props.userId)
    }
    props.setUserIDList(props.userIDList);
  }

  
    return (
      <form onSubmit={handleSubmit}>
        <button type='submit' data-cy='like-button' className='like-btn-box'><img src='thumb-icon.png' className='like-btn' alt='thumb' /></button>
      </form>
    )
    }


export default LikeButton;