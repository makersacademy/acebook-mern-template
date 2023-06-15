import React from 'react';

const LikeButton = ({ onLike }) => {
  return <button id="submit-like" data-cy="likeButton" onClick={onLike}>Isenlike!
  </button>;
};

export default LikeButton;
