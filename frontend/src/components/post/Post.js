import React, { useState } from 'react';
import './Post.css'
import LikeButton from '../likeButton/likeButton';

const Post = ({ post }) => { 
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(post.comments || []);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (comment.trim() !== '') {
      console.log(comments);
      setComments([...comments, {comment_message: comment, date: Date.now()}]);
      setComment('')
    }
    fetch(`/posts/${post._id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ comment: comment })
    })
      .then(async response => {
          let data = await response.json();
          // console.log("token", data)
          window.localStorage.setItem("token", data.token);

      })
    };
    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false, };
      const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
      return formattedDate;
  };

  return (
    <div data-cy="post" className="post">
      <article data-cy="post" key={ post._id }>
        { post.message }<br />
      <small className="smallText">{formatDate(post.date)}</small><br />
      <LikeButton post_id={ post._id }/>
      </article>
      <br />
      <div>
        {comments.map((comment, index) => (
          <div key={index}>{comment.comment_message}
          <br />
          {comment.date && 
            <small className="smallText">{formatDate(comment.date)}</small>
          }
          <small className="smallText">{comment.username}</small>
          
          </div>
          

        ))}
          
        
      </div>

      <form onSubmit={handleSubmitComment}>
        <label>
          Comment:
          <input
            type="text"
            value={comment}
            onChange={handleCommentChange}
            placeholder="Add a comment..."
          />
        </label>
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
};


export default Post;


