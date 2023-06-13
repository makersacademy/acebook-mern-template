import React from 'react';
import { useState, useEffect } from 'react';
import { fetchComments, handleSendingNewComment } from '../../fetchers';
import Comment from '../comment/Comment';

const Post = ({post}) => {
  const [commentMessage, setCommentMessage] = useState('');
  const [comments, setComments] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  // adds the comments in the comment feed on first render
  useEffect(() => {
    fetchComments(token, setToken, setComments, post._id)
    console.log('this is useEffect')
  }, []);
  // submits a comment on clicking submit button
  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    await handleSendingNewComment(token, post, { message: commentMessage }, '/posts/add-comment');
    // re-renders the comment feed with the new comment
    await fetchComments(token, setToken, setComments, post._id)
    // sets the input field back to empty string
    console.log(comments);
    setCommentMessage("");
  }

  return(
    <>
      <article data-cy="post" key={post._id}>{post.message}</article>
      <form onSubmit={handleCommentSubmit}>
        <textarea
          data-cy="comment-input-field"
          value={commentMessage}
          onChange={(event) => setCommentMessage(event.target.value)}
          type="text"
          placeholder='What do you think?'
          required>  
        </textarea>
        <button data-cy="submit-comment">Submit</button>
      </form>

      <div id='comment-feed' role="feed">
       {comments.map(
          (comment, index) => ( <Comment comment={ comment } key={ comment._id + index}/>)
       )}
      </div>
    </>
  )
}

export default Post;

