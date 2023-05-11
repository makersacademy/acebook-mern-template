import React from "react";
import { useState} from "react";

const Like = ( { postId } ) => {
  let like = 0;
  const [likeCount, setLikeCount] = useState(0);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const handleLikeClick = () => {
    setLikeCount(likeCount + 1);
  }

  // const handleClick = async (event) => {
  //   event.preventDefault();

  //   let response = await fetch( '/posts', {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${token}`
  //     },
  //     body: JSON.stringify({ message: message })
  //   })

  //   setLike();
  // }

  return (
    <button onClick={handleLikeClick}> 
      LIKE
    </button>
  )
}

export default Like;