import React, { useState, useEffect } from 'react';
import styles from './Post.module.css';
import ReactTimeAgo from 'react-time-ago';

const Post = ({ post, setReload }) => {
  const user_id = window.localStorage.getItem('user_id');
  const token = window.localStorage.getItem('token');

  const isPostLikedByUser = post.likes.includes(user_id);
  const [isLiked, toggleIsLiked] = useState(isPostLikedByUser);

  const handleLikeToggle = async () => {
    toggleIsLiked((likeState) => !likeState);
    console.log(post);
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
      <div className={styles.container}>
        <div className={styles.postContent}>
          <img alt='avatar' src={post.user_id && post.user_id.image} />
          <span>{post.user_id && post.user_id.display_name}</span>
          <br />
          <article className={styles.content} data-cy='post' key={post._id}>
            {post.message}
          </article>
        </div>
        <div>
          <button
            type='button'
            data-cy='like-button'
            onClick={handleLikeToggle}
          >
            {isLiked ? 'Unlike' : 'Like'}
          </button>
          <span>Likes: {post.likes.length}</span>
          <br />
          <span>
            Posted{' '}
            <ReactTimeAgo
              date={post.createdAt}
              locale='en-US'
              timeStyle='twitter'
            />{' '}
            ago
          </span>
        </div>
      </div>
    </>
  );
};

export default Post;
