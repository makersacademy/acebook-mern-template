import React, { useState, useEffect } from 'react';
import Comment from "../comment/Comment";
import CreateComment from "../CreateComment/CreateComment";
import "./Post.css"
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const Post = ({ post, setUpdated }) => {
  
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
    <div className="post-container">
      <div className="post-card" data-cy="post" key={ post._id }>
        <div className="card-header">
          <div className="card-meta">
            <h2 className="username">{ post.author.name }</h2>
            <p className="timestamp">{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</p>
          </div>
        </div>
        <p className="card-message">{ post.message }</p>
        <div className="likes-and-comments-buttons-container">
          <button className="comments-buttons" onClick={handleViewComments}>Add comment</button>
          {comments.length > 0 ? 
            <button className="comments-buttons" onClick={handleViewComments}>{ comments.length } comments</button> : 
            <button className="comments-buttons">{ comments.length } comments</button>}
        </div>
        { comments && (viewComments === true) &&
          <div id="comments-container">
            <div className="add-comment-container">
              <CreateComment post_id={post._id} setUpdated={setUpdated} />
            </div>
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
