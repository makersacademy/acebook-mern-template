import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons/faThumbsUp";
import { faThumbsUp as farThumbsUp } from "@fortawesome/free-regular-svg-icons"; 

const LikeButton = ({ likes, onClick, isLiked }) => {
  return (
    <button className="likeButton" onClick={onClick}>
      <FontAwesomeIcon
        icon={isLiked ? faThumbsUp : farThumbsUp} 
      />{" "}
      {likes}
    </button>
  );
};

export default LikeButton;
