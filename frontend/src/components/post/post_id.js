
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

const PostId = () => {
    const [post, setPost] = useState([]);

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
