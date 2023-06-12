import React from 'react';
import { useState, useEffect } from 'react';
import { fetchComments, handleSendingNewComment } from '../../fetchers';
import Comment from '../comment/Comment';
// one state that defaults as an empty string
// apply the state to the form
// useEffect hook
// handleCommentSubmit function

const Post = ({post}) => {
  const [commentMessage, setCommentMessage] = useState('');
  const [commentsText, setCommentsText] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  useEffect(() => {
    fetchComments(token, setToken, setCommentsText, post._id)
  }, [])

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    handleSendingNewComment(token, post, { message: commentMessage }, '/posts/add-comment');
    fetchComments(token, setToken, setCommentsText, post._id)
    setCommentMessage("");
  }

  return(
    <>
      <article data-cy="post" key={post._id}>{post.message}</article>
      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={commentMessage}
          onChange={(event) => setCommentMessage(event.target.value)}
          type="text"
          placeholder='What do you think?'
          required>  
        </textarea>
        <button>Submit</button>
      </form>

      <div id='comment-feed' role="feed">
       {commentsText.map(
          (comment, index) => ( <Comment comment={ comment } key={ comment._id + index}/>)
       )}
      </div>
    </>

  )
}

export default Post;

// post.comment. i need an area for someone to make a comment
// this is also where we can add our likes

// add text area
// add submit button
// setup handleSubmit

// make a like component 

// research making a folder called fetchers
