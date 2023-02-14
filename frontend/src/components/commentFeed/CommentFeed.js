import React, { useEffect, useState } from 'react';
// import CreateCommentForm from '../createCommentForm/createCommentForm';
import Post from '../post/Post'
import Comment from '../comment/Comment'

const CommentFeed = ({ navigate, post_id }) => {
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const [isUpdated, setIsUpdated] = useState(false);

    useEffect(() => {
        if(token && (isUpdated || comments.length === 0)) {
          fetch("/comments", {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            body: {
                "post_id": post_id
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
}