
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

const PostId = () => {
    const [post, setPost] = useState({});
    const [token, setToken] = useState(window.localStorage.getItem("token"));

    const { id } = useParams();

    useEffect(() => {
            fetch(`/posts/${id}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(async data => {
                    console.log("Full Data:", data);
                    console.log("Author:", data.author);
                    window.localStorage.setItem("token", data.token)
                    setToken(window.localStorage.getItem("token"))
                    setPost(
                        {
                        message: data.message,
                        author: data.author
                    });
                });
            }, {})
    
        console.log("Line 30 --- ", post)
    
        return(
            <div >
                <p data-cy='post'>{post.message}</p>
                <p data-cy='author'>{post.author}</p>
            </div>
        )
}

export default PostId;
