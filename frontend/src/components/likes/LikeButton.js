import React, { useState } from 'react';
import './LikeButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons/faThumbsUp';
import { faThumbsUp as faThumbsUpRegular } from '@fortawesome/free-regular-svg-icons';

const LikeButton = ({ likes, onClick, isLiked }) => {
  const [animate, setAnimate] = useState(false);

  const handleClick = () => {
    setAnimate(true);
    onClick();
    setTimeout(() => {
      setAnimate(false);
    }, 500);
  };

  return (
    <div className='like-button' onClick={handleClick}>
      {isLiked ? (
        <FontAwesomeIcon
          icon={faThumbsUp}
          className={`like-icon ${isLiked ? 'liked' : ''} ${animate ? 'shake' : ''}`}
        />
      ) : (
        <FontAwesomeIcon
          icon={faThumbsUpRegular}
          className={`like-icon ${isLiked ? 'liked' : ''} ${animate ? 'shake' : ''}`}
        />
      )}{" "}
      {likes > 0 && <span>{likes}</span>}
    </div>
  );
};

export default LikeButton;
