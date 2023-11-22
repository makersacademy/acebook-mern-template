import React, { useEffect, useState } from 'react';
import Comment from '../comment/Comment'

const CommentFeed = ({ post_id, navigate }) => {
  const [comments, setComments] = useState([]);
	const [token, setToken] = useState(window.localStorage.getItem("token"));


useEffect(() => {
  if(token) {
    fetch(`/comments/${post_id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(async data => {
        window.localStorage.setItem("token", data.token)
        setToken(window.localStorage.getItem("token"))
        setComments(data.comments);
      })
      .catch(error => console.error('Error fetching comments', error))
  }
}, [])

  return(
    <>
      <p title="comments heading">Comments:</p> 
      <div id='comment-feed' role="feed">
        {Array.isArray(comments) && comments.length > 0 ? (
          comments.map((comment) => (
          <Comment comment={ comment } key={ comment._id } />
          ))
          ) : (
            <p data-cy="no-comments-message">No one has commented yet - be the first!</p>
          )}
      </div>
    </>
  )
}

export default CommentFeed;
