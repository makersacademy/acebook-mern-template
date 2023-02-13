import React, { useState, useEffect } from 'react';

const Post = ({ post, setReload }) => {
  const user_id = window.localStorage.getItem('user_id');
  const token = window.localStorage.getItem('token');

  const isPostLikedByUser = post.likes.includes(user_id);
  const [isLiked, toggleIsLiked] = useState(isPostLikedByUser);

  const handleLikeToggle = async () => {
    toggleIsLiked((likeState) => !likeState);

    if (user_id) {
      let url = isLiked ? '/posts/unlike' : '/posts/like';
      let response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ _id: post._id, _user_id: user_id }),
      });
      console.log(response);
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
      <article data-cy='post' key={post._id}>
        {post.message}
      </article>
      <button type='button' data-cy='like-button' onClick={handleLikeToggle}>
        {isLiked ? 'Unlike' : 'Like'}
      </button>
    </>
  );
};

export default Post;
