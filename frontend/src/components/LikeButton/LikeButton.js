import React from 'react';


const LikeButton = ({ onLike }) => {
  return <button data-cy="likeButton" onClick={onLike}>I am the lord of the likes said he!!
  </button>;
};


export default LikeButton;
