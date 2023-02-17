import React, { useEffect, useState } from 'react';
import CreateCommentForm from '../createCommentForm/createCommentForm';
import Comment from '../comment/Comment'

const CommentFeed = ({ navigate }) => {
    const [post, setPost] = useState([]);
    const [comments, setComments] = useState([]);
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const [isUpdated, setIsUpdated] = useState(false);

    console.log(token)

    useEffect(() => {
        if(token && (isUpdated || post.length === 0)) {
            fetch(window.location.pathname, {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then(async data => {
                window.localStorage.setItem("token", data.token)
                setToken(window.localStorage.getItem("token"))
                setPost(data.post.message);
                setComments(data.post.comments);
                setIsUpdated(false);
            })
        }
    }, [token, comments, isUpdated]);

    if(token) {
        return(
            <>
                <h2>{post}</h2>
                <CreateCommentForm callback={(value) => setIsUpdated(value)}/>
                <div id='feed' role="feed">
                    {comments.map((comment) => ( <Comment comment={ comment } key={ comment._id } /> ))}
                </div>
            </>
        )
    } else {
        navigate('/login')
    }
}

export default CommentFeed;