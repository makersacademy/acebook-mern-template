import React from 'react';

const LikeButton = () => {
  return (
    <div className="like-container">
      <img src='thumb-icon.png' className='like-btn' alt='thumb' />
      <span class="like-count" data-cy="post-likes">0</span>
    </div>
  );
};

export default LikeButton;

