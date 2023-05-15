import React, { useEffect } from "react";
import { useState, useContext } from "react";
import {AuthenticationContext} from '../authenticationProvider/AuthenticationProvider';

const Like = ( { postId, likesCount } ) => {

  const [likeCount, setLikeCount] = useState(likesCount); // declare likeCount before initializing it
  const {token, setToken} = useContext(AuthenticationContext)

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
    setLikeCount(data.post.likeCount);
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
