import React from 'react';
import './Like.css';

const Like = ({post_id, isLiked}) => {

  const addLike = () => {
    console.log("clicked")
  }
  let button_to_display;

  if (isLiked) {
    button_to_display = 123
  }


  return (
    <>
    <button onClick={addLike} className="like-button">👍</button><p className="like-amount">Likes: 0</p>
    </>
    )
}

export default Like;

// {/* // <h5>{post_id}</h5> */}