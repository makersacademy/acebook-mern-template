import React, { useState, useEffect } from 'react';

const Comment = ({ comment, setReload }) => {
  const user_id = window.localStorage.getItem('user_id');
  const token = window.localStorage.getItem('token');
  debugger;
  const isCommentLikedByUser = comment.likes.includes(user_id);

  const [isLiked, toggleIsLiked] = useState(isCommentLikedByUser);

  const handleLikeToggle = async () => {
    toggleIsLiked((likeState) => !likeState);

    if (user_id) {
      let url = isLiked ? '/comments/unlike' : '/comments/like';
      let response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ _id: comment._id, _user_id: user_id }),
      });
      const data = await response;
      if (response.status !== 204) {
        console.log(data.error);
      } else {
        setReload(true);
      }
    }
  };

  return (
    <>
      <article data-cy='comment'>{comment.message}</article>
      <div data-cy='like-button' onClick={handleLikeToggle}>
        {isLiked ? (
          <img src='/images/thumbFilled.png' alt='like' />
        ) : (
          <img src='/images/thumbOutline.png' alt='like' />
        )}
      </div>
    </>
  );
};
export default Comment;
