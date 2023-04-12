import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons/faThumbsUp";

const LikeButton = ({ likes, onClick }) => {
  return (
    <button onClick={onClick}>
      <FontAwesomeIcon icon={faThumbsUp} /> {likes}
      </button>
      
  );
};

export default LikeButton;