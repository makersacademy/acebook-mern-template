import React, { useState } from 'react';
import './Post.css';

const Post = ({post, onLike, onComment}) => {
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    onLike(post._id);
  };

  const handleComment = (event) => {
    event.preventDefault();
    onComment(post._id, newComment);
    setNewComment('');
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  }

  return (
    <article data-cy="post" key={ post._id }>
      <p className="post-message">{ post.message }</p> 
      <div className="button-container">
        <button onClick={handleLike}>👍 | { post.like }</button>
        <button onClick={toggleComments}>
          { showComments ? 'Hide Comments' : `💬 (${post.comments.length})` }
        </button>
      </div>
      {showComments && (
        <>
          <h3>Comments</h3>
          {post.comments.map(comment => 
            <p key={comment._id}><strong>{comment.author.name}:</strong> {comment.comment}</p>
          )}
          <form onSubmit={handleComment}>
            <label>
              New Comment:
              <input type="text" value={newComment} onChange={(event) => setNewComment(event.target.value)} />
            </label>
            <button type="submit">Comment</button>
          </form>
        </>
      )}
    </article>
  )
}

export default Post;
