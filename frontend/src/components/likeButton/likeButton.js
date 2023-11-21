import likebutton from './static/like.png';
import React, { useState, useEffect } from 'react';
import './likeButton.css';
import LikeAmount from './likeAmount';

const LikeButton = (props) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState(0);
    const [token, setToken] = useState(window.localStorage.getItem('token'));

    useEffect(() => {

    const updateLikesOnServer = async (newLikes) => {
        try {
        const response = await fetch(`/posts/${props.post_id}/likes`, {
            method: 'put',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ likes: newLikes }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log('token', data);
            window.localStorage.setItem('token', data.token);
        } else {
            console.error('Failed to update likes');
        }
        } catch (error) {
        console.error('Error in fetching or parsing data:', error);
        }
    };

    // Call the function to update likes when the component mounts
    updateLikesOnServer(likes);

}, [likes, token, props.post_id]);

    const handleSubmitLikes = (e) => {
    e.preventDefault();
    const newLikes = isLiked ? -1 : 1; // Toggle between -1 and 1
    setIsLiked(!isLiked);
    setLikes(newLikes);
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
        <small><LikeAmount post_id={ props.post_id } /></small>
    </div>
    );
};

export default LikeButton;