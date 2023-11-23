import React, { useState } from 'react';
import './Post.css';
import Comment from '../comment/Comment';
import NewComment from '../comment/NewComment';
import Like from '../like/Like';


const Post = ({post, userId, fetchPosts}) => {
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [visibleComments, setVisibleComments] = useState(2);
  const [commentsButtonLabel, setCommentsButtonLabel] = useState("Hide comments");

  
  // Format datetime of post
  const date = new Date(post.created)
  const dateFormat = { year: 'numeric', month: 'numeric', day: 'numeric' };
  const formattedDate = new Intl.DateTimeFormat('en-GB', dateFormat).format(date);

  const toggleCommentForm = () => {
    setShowCommentForm((prev) => !prev);
  };

  const toggleVisibleComments = () => {
    // Toggle the visibility 
    setVisibleComments((prev) => (prev === 0 ? 2 : 0));
    setCommentsButtonLabel((prevLabel) =>
      prevLabel === "Hide comments" ? "View comments" : "Hide comments"
    );
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
        <a onClick={toggleVisibleComments} style={{ cursor: 'pointer' }}>{commentsButtonLabel}</a>
          <button data-cy="post-comment" className='primary-btn' onClick={toggleCommentForm} style={{ cursor: 'pointer' }}>
            Add comment
          </button>
        </div>
      </div>
      {showCommentForm && <NewComment postId={post._id} fetchPosts={fetchPosts} />}
      <div data-cy="post-comments" className='post-comments'>
        {post.comments.slice(0, visibleComments).map((comment) => (
          <Comment comment={comment} key={comment._id} />
        ))}
        </div>
    </div>
    );
  };

export default Post;

