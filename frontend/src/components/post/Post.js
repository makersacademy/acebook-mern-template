import React, { useState, useEffect } from 'react';
import LikeButton from '../LikeButton/LikeButton';
import { handleSendingNewLike } from '../../fetchers';
import './Post.css';

const Post = ({post}) => {
  const [likeCount, setLikeCount] = useState(post.likedByUsers.length);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  
  const handleLike = async () => {
    const response = await handleSendingNewLike(token, post, '/posts/add-like');
    const responseData = await response.json();
    setLikeCount(responseData.likeCount);
  }

  return (
    <>
      <h2>{ post.username }</h2>
      <article className='post' data-cy="post" key={post._id}>
        {post.message} - Likes: {likeCount}
        <LikeButton onLike={handleLike} />
      </article>
    </>
  );
};

export default Post;
