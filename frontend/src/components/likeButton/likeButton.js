import likebutton from './static/like.png';
import React from 'react';
import './likeButton.css'
import { useState } from 'react';

const LikeButton = (props) => {
    const [isLiked, setIsLiked] = useState(false)
    const [likes, setLikes] = useState(0);

    const like = () => {
        setIsLiked(!isLiked);
        setLikes((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1));
    };

    return(
        <div>
        <button className='likeButton' onClick={like}><img src={likebutton} alt="Like" /></button>
        <small>{likes}</small></div>
    )
}

export default LikeButton;