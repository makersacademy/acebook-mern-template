
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

// component for displaying post

// const Feed = ({ navigate }) => {
//     const [posts, setPosts] = useState([]);
//     const [token, setToken] = useState(window.localStorage.getItem("token"));
// const [editPostForm, ]

const PostId = () => {
    const [post, setPost] = useState([]);
    // const [token, setToken] = useState(window.localStorage.getItem("token"));
    const { id } = useParams();

    useEffect(() => {
            fetch(`/posts/${id}`)
                .then(response => response.json())
                .then(async data => {
                    setPost(data);
                })
            
        }, [id]);
        
        return(
            <div >
                <p data-cy='post'>{post.message}</p>
            </div>
        )
}

export default PostId;