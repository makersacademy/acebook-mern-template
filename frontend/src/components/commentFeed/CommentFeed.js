import React, { useEffect, useState } from 'react';
// import CreateCommentForm from '../createCommentForm/createCommentForm';
import Post from '../post/Post'
import Comment from '../comment/Comment'

const CommentFeed = ({ navigate }) => {
    console.log("comment feed is executed")
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const [isUpdated, setIsUpdated] = useState(false);

    useEffect(() => {
        if(token && (isUpdated || comments.length === 0)) {
          fetch("/posts/:post_id/", {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
            .then(response => response.json())
            .then(async data => {
              window.localStorage.setItem("token", data.token)
              setToken(window.localStorage.getItem("token"))
              setPosts(data.posts.reverse());
              setIsUpdated(false);
            })
        }
    }, [token, comments, isUpdated]);

    if(token) {
      return(
        <>
        <h2>Post test test</h2>
        {/* <Post post={ "test post" } key={ "post._id" } /> */}
            {/* <CreateCommentForm callback={(value) => {
              setIsUpdated(value); 
            }}/> */}
          {/* <div id='feed' role="feed">
              {posts.map(
                (post) => ( <Post post={ post } key={ post._id } /> )
              )}
          </div> */}
        </>
      )
    }
}

export default CommentFeed;