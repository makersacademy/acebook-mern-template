
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import NavigationBar from '../navigation/Navigation';

const PostId = ({}) => {
    const [post, setPost] = useState({});
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const [isLiked, setIsLiked] = useState(true);

    const { id } = useParams();

    useEffect(() => {
            fetch(`/posts/${id}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(async data => {
                    window.localStorage.setItem("token", data.token)
                    setToken(window.localStorage.getItem("token"))
                    const isPostLikedByUser = data.likes.includes(data.logged_in_user)
                    setIsLiked(isPostLikedByUser)
                    
                    setPost(
                        {
                        message: data.message,
                        author: data.author,
                        likedBy: data.likes,
                        likes: data.likes.length,
                        logged_in_user: data.logged_in_user
                    });
                });
            }, []);



    const handleLike = async () => {
        const response = await fetch(`/posts/${id}/likeUnlike`,{
            method: 'post',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (response.status === 201) {
        const newLikesCount = post.likes + 1;
        setPost(prevPost => ({ ...prevPost, likes: newLikesCount }));
        setIsLiked(true)
        }
        
        if (response.status === 200) {
        const newLikesCount = post.likes - 1; 
        setPost(prevPost => ({ ...prevPost, likes: newLikesCount }));
        setIsLiked(false)
        }
    }
    
    return(
            <div >
                <NavigationBar />
                <p data-cy='post'>{post.message}</p>
                <p data-cy='author'>Posted by: {post.author}</p>
                <p data-cy='likes'>{post.likes} Likes</p>
                <div>
                    <button id='likeUnlike' onClick={handleLike}>
                        {isLiked ? '🧡' : '🤍'}
                    </button>
                    {isLiked ? <p>Unlike this post</p> : <p>Like this post</p>}
                </div>
            </div>
        ); 
    }

export default PostId;