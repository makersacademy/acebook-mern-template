import React, { useState, useEffect } from 'react';
import Comment from "../comment/Comment";
import "./Post.css"
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const Post = ({ post }) => {
  
  const comments = post.comments;
  const [viewComments, setViewComments] = useState(false)
  // const [comments, setComments] = useState(post.comments);
  // const [commentsUpdated, setCommentsUpdated] = useState(false);

  // useEffect(() => {
  //   fetch(`posts/${post._id}`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then()
  // })
  
  const handleViewComments = () => {
    if (viewComments === false) {
      setViewComments(true);
    } else if (viewComments === true) {
      setViewComments(false);
    }
  }
  
  return (
    <div class="post-container">
      <div class="post-card" data-cy="post" key={ post._id }>
        <div class="card-header">
          <div class="card-meta">
            <h2 class="username">{ post.author.name }</h2>
            <p class="timestamp">{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</p>
          </div>
        </div>
        <p class="card-message">{ post.message }</p>
        <div className="view-comments-container">
          <button className="view-comments-button" onClick={handleViewComments}>View comments</button>
        </div>
      { comments && (viewComments === true) &&
        <div id="comments-container">
          {comments.map((comment) => (
            <Comment comment={comment} key={comment._id} />
          ))}
        </div>
      }
      </div>
    </div>
  )
}

export default Post;
