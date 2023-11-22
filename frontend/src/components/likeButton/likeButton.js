import likebutton from './static/like.png';
import React, { useState, useEffect } from 'react';
import './likeButton.css';
import LikeAmount from './likeAmount';

const LikeButton = (props) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState(0);
    const [token, setToken] = useState(window.localStorage.getItem('token'));

    const updateLikesOnServer = async (newLikes) => {
        try {
        const response = await fetch(`/posts/${props.post_id}/likes`, {
            method: 'put',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ likes : newLikes }),
        });
    
        if (response.ok) {
            const data = await response.json();
            window.localStorage.setItem('token', data.token);
        } else {
            console.error('Failed to update likes');
        }
        } catch (error) {
            console.error('Error in fetching or parsing data:', error);
        }
    };

    const AddOrRemovePostIdtoUserifLikedOrUnliked = async () => {
    try {
        const response = await fetch(`/users/likes`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ postId: props.post_id }),
        });

        if (response.ok) {
        const data = await response.json();
            if (data.postIsLiked === true) {
                setIsLiked(true)
                setLikes(1);
            } 
            else if (
                data.postIsLiked === false
            ) {
                setIsLiked(false) 
                setLikes(-1);
            } 
        } else {
        console.error('Failed to check if liked');
        }
    } catch (error) {
        console.error('Error in fetching or parsing data:', error);
    }
};

useEffect(() => {
    updateLikesOnServer(likes);
}, [likes]);


    const handleSubmitLikes = async (e) => {
    e.preventDefault();
        AddOrRemovePostIdtoUserifLikedOrUnliked()
    };

    return (
    <div>
        <form onSubmit={handleSubmitLikes}>
        <label>
            Likes:
            <button
            className='likeButton'
            type='submit'
            onClick={handleSubmitLikes}
            >
            <img src={likebutton} alt='Like' />
            </button>
        </label>
        </form>
        <small><LikeAmount likes={ likes } post_id={ props.post_id } /></small>
    </div>
    );
};

export default LikeButton;