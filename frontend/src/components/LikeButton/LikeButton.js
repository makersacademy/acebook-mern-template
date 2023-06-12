import React from 'react';

const LikeButton = ({ onLike }) => {
  return <button data-cy="likeButton" onClick={onLike}>Isenlike!
  </button>;
};

export default LikeButton;
