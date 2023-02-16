import React, { useState, useEffect, useNavigate } from 'react';
import styles from './Post.module.css';
import ReactTimeAgo from 'react-time-ago';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import Comment from '../comment/Comment';
import CreateCommentForm from '../createCommentForm/CreateCommentForm';
const apiUrl = require('../../apiUrl');
TimeAgo.addLocale(en);

const Post = ({ post, setReload }) => {
  const user_id = window.localStorage.getItem('user_id');
  const token = window.localStorage.getItem('token');

  const isPostLikedByUser = post.likes.includes(user_id);

  const [isLiked, toggleIsLiked] = useState(isPostLikedByUser);
  const [isExpanded, toggleExpansion] = useState(false);

  const handleLikeToggle = async () => {
    toggleIsLiked((likeState) => !likeState);
    console.log(post);
    if (user_id) {
      let url = isLiked ? `${apiUrl}/posts/unlike` : `${apiUrl}/posts/like`;
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

  const handleCommentExpansionToggle = async () => {
    toggleExpansion(!isExpanded);
    setReload(true);
  };

  const displayComments = () => {
    const finalIndex = isExpanded ? post.comments.length : 3;
    return post.comments
      .slice(0, finalIndex)
      .map((comment) => <Comment comment={comment} />);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.postHeader}>
          <div className={styles.avatar}>
            <img alt='avatar' src={post.user_id && post.user_id.image} />
          </div>
          <div>
            <h1> {post.user_id && post.user_id.display_name}</h1>
            <p>
              Posted{' '}
              <ReactTimeAgo
                date={post.createdAt}
                locale='en-US'
                timeStyle='twitter'
              />{' '}
              ago
            </p>
          </div>
        </div>
        <article className={styles.content} data-cy='post' key={post._id}>
          {post.message}
          <div className='comment-section'>
            {isExpanded && (
              <CreateCommentForm
                navigate={useNavigate}
                token={token}
                user_id={user_id}
                post_id={post._id}
                setReload={setReload}
              />
            )}
            {post.comments && displayComments()}
            {
              <button
                data-cy='expand-button'
                onClick={handleCommentExpansionToggle}
              >
                Comment
              </button>
            }
          </div>
        </article>

        <div>
          <div className={styles.postFooter}>
            <div
              className={styles.like}
              data-cy='like-button'
              onClick={handleLikeToggle}
            >
              {isLiked ? (
                <img src='/images/thumbFilled.png' alt='like' />
              ) : (
                <img src='/images/thumbOutline.png' alt='like' />
              )}
            </div>
            <div className={styles.likesNumber}>
              <div>
                <img src='/images/likes.jpg' alt='Number of likes' />
              </div>
              <p>{post.likes.length}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
