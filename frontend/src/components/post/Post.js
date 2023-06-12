import React from 'react';
import { useState, useEffect } from 'react';
import { fetchComments, handleSendingNewComment } from '../../fetchers';
import Comment from '../comment/Comment';

const Post = ({post}) => {
  const [commentMessage, setCommentMessage] = useState('');
  const [commentsText, setCommentsText] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  // adds the comments in the comment feed on first render
  useEffect(() => {
    fetchComments(token, setToken, setCommentsText, post._id)
    console.log('this is useEffect')
  }, []);
  // submits a comment on clicking submit button
  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    await handleSendingNewComment(token, post, { message: commentMessage }, '/posts/add-comment');
    // re-renders the comment feed with the new comment
    await fetchComments(token, setToken, setCommentsText, post._id)
    // sets the input field back to empty string
    console.log(commentsText);
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

