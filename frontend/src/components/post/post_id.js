
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

const PostId = () => {
    const [post, setPost] = useState({ message: '', author: '' });

    const { id } = useParams();

    useEffect(() => {
            fetch(`/posts/${id}`)
                .then(response => response.json())
                .then(async data => {
                    setPost({
                        message: data.message,
                        author: data.author
                    })
                })
            
        }, [id]);
    useEffect(() => {
            console.log('here is the',post)
        }, [post]);
    
        return(
            <div >
                <p data-cy='post'>{post.message}</p><p data-cy='author'>{post.author}</p>
            </div>
        )
}

export default PostId;
