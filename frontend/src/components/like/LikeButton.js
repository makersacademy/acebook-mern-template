import React from "react";
import { useState } from "react";

const LikeButton = (props) => {
  const [isLiked, setIsLiked] = useState(false)



  const handleLike = () => {
    if (isLiked === true) {
      console.log("alreadyLiked");
      const index = props.userIDList.indexOf(props.userId);
      if (index > -1) { // only splice array when item is found
        props.userIDList.splice(index, 1); // 2nd parameter means remove one item only
      }
      setIsLiked(false)
    } else {
      console.log("notLiked");
      props.userIDList.push(props.userId)
      setIsLiked(true)
    }
    console.log("before setUserIDList: " + props.userIDList);
    props.setUserIDList(props.userIDList);
    console.log("after setUserIDList: " + props.userIDList);
  }

  
    return (
        <img src='thumb-icon.png' className='like-btn' alt='thumb' onClick={handleLike}/>
    )
}
 

export default LikeButton;