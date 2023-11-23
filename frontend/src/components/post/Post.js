import React, { useState } from 'react';
import './Post.css';
import Comment from '../comment/Comment';
import NewComment from '../comment/NewComment';
import Like from '../like/Like';


const Post = ({post, userId, fetchPosts}) => {
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [visibleComments, setVisibleComments] = useState(2);
  
  // Format datetime of post
  console.log(post)
  const date = new Date(post.created)
  const dateFormat = { year: 'numeric', month: 'numeric', day: 'numeric' };
  const formattedDate = new Intl.DateTimeFormat('en-GB', dateFormat).format(date);

  const toggleCommentForm = () => {
    setShowCommentForm((prev) => !prev);
  };

  const loadMoreComments = () => {
    setVisibleComments(visibleComments + 2); // Increase the number of visible comments
  };

  return (
    <div className='post-box'>
      <div className='post-row'>
        <div className='flex-align-vertical post-avatar-gap'>
          <img src="logo192.png" alt='avatar-image' className='avatar avatar-small' />
          <p data-cy="post-author" className='post-author'>{post.author.email}</p>
        </div>
        <p data-cy="post-date" className='post-date'>{formattedDate}</p>
      </div>
      <div className='post-content'>
        <p data-cy="post-content" key={post._id}>{post.content}</p>
      </div>
      <div className='post-row'>
        <Like post={post} userId={ userId }/>
        <div className='flex-align-vertical post-comments-gap'>
          <a onClick={toggleCommentForm}>View comments</a>
          <button data-cy="post-comment" className='primary-btn' onClick={toggleCommentForm}>
            Add comment
          </button>
        </div>
      </div>
      {showCommentForm && <NewComment postId={post._id} fetchPosts={fetchPosts} />}
      <div data-cy="post-comments" className='post-comments'>
        {post.comments.slice(0, visibleComments).map((comment) => (
          <Comment comment={comment} key={comment._id} />
        ))}
        {visibleComments < post.comments.length && (
          <button className='load-more-btn' onClick={loadMoreComments}>
            Load More Comments
          </button>
        )}
      </div>
    </div>
  );
};

export default Post;

