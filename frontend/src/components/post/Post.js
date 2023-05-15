// Update import to include useState
import React, { useState } from 'react';

const Post = ({post, onLike, onComment}) => {
  const [newComment, setNewComment] = useState('');

  const handleLike = () => {
    onLike(post._id);
  };

  const handleComment = (event) => {
    event.preventDefault();
    onComment(post._id, newComment);
    setNewComment('');
  };

  return (
    <article data-cy="post" key={ post._id }>
      { post.message }  
      <button onClick={handleLike}>👍 | { post.like }</button>
      <h3>Comments</h3>
      {post.comments.map(comment => 
        <p key={comment._id}><strong>{comment.author}:</strong> {comment.comment}</p>
      )}
      <form onSubmit={handleComment}>
        <label>
          New Comment:
          <input type="text" value={newComment} onChange={(event) => setNewComment(event.target.value)} />
        </label>
        <button type="submit">Comment</button>
      </form>
    </article>
  )
}


export default Post;
