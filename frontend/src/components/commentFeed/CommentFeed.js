import React, { useEffect, useState } from 'react';
// import CreateCommentForm from '../createCommentForm/createCommentForm';
import Post from '../post/Post'
import Comment from '../comment/Comment'

const CommentFeed = ({ navigate }) => {
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
      if(token && (isUpdated || post.length === 0)) {
        fetch(window.location.pathname, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
          .then(response => response.json())
          .then(async data => {
            console.log(data)
            window.localStorage.setItem("token", data.token)
            setToken(window.localStorage.getItem("token"))
            setPost(data.post);
            setIsUpdated(false);
          })
      }
  }, [token, post, isUpdated]);

  if(token) {
    return(
      <>
        <h1>Test</h1>
        {console.log(post)}
        <h2>{post.message}</h2>
        {/* <h2><Post post={ post } key={ post._id } /></h2> */}

        <div id='feed' role="feed">
          {post.comments.map(
            (comment) => ( 
              <p>{comment.content}</p>
              // <Comment comment={ comment } key={ comment._id } />
            )
          )}
        </div>
      </>
    )
  }
}

export default CommentFeed;