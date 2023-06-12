import React, { useState } from 'react';
import LikeButton from '../LikeButton/LikeButton';
import { handleSendingNewLike } from '../../fetchers';

const Post = ({post}) => {
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const handleLike = async () => {
    let newCount = likeCount + 1
    await handleSendingNewLike(token, post, '/posts/add-like');
    setLikeCount(newCount);
  }

  return (
    <article data-cy="post" key={post._id}>
      {post.message} - Likes: {likeCount}
      <LikeButton onLike={handleLike} />
    </article>
  );
};

export default Post;