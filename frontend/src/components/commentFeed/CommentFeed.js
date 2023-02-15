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
              console.log(data.post)
            })
        }
    }, [token, post, isUpdated]);

    if(token) {
      return(
        <>
        <h1>Post test</h1>
        <Post post={ post } key={ post._id } />
            {/* <CreateCommentForm callback={(value) => {
              setIsUpdated(value); 
            }}/> */}
          <div id='feed' role="feed">
              {post.comments.map(
                (comment) => ( 
                <Comment comment={ comment } key={ comment._id } />
                )
              )}
          </div>
          <p>End of test</p>
        </>
      )
    }
}

export default CommentFeed;