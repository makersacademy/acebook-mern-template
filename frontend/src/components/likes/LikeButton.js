import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons/faThumbsUp";
import { Button } from "react-bootstrap";


const LikeButton = ({ likes, onClick }) => {
  return (

    <Button variant="outline-secondary" onClick={onClick}>
     <FontAwesomeIcon icon={faThumbsUp} /> Like {likes}
    </Button>
  );
};

export default LikeButton;
