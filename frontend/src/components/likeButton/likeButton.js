// import likebutton from './static/like.png';
// import React from 'react';
// import './likeButton.css'
// import { useState } from 'react';

// const LikeButton = (props) => {
//     const [isLiked, setIsLiked] = useState(false)
//     const [likes, setLikes] = useState(0);
//     const [token, setToken] = useState(window.localStorage.getItem("token"));
    
//     const handleLikesChange = (e) => {
//         setLikes(e.target.value);
//         };
    
//     const handleSubmitLikes = (e) => {
//         e.preventDefault();
//             setIsLiked(!isLiked) 
//             if (likes === 0 && isLiked === true) {
//             setLikes(1) 
//             } else if (likes === 1 && isLiked === false) {
//                 setLikes(-1)
//             } 
//             setLikes({likes: likes});
//             }
    
//     fetch(`/posts/${post._id}/likes`, {
//         method: 'put',
//         headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({ likes: likes })
//         })
//         .then(async response => {
//             let data = await response.json();
//             console.log("token", data)
//             window.localStorage.setItem("token", data.token);
//         })

//     return(
//         <div>
//             <form onSubmit={handleSubmitLikes}>
//             <label>Likes:</label>

//         <button className='likeButton' type="submit" onClick={handleSubmitLikes} onChange={handleLikesChange}><img src={likebutton} alt="Like" /></button></form>
//         <small>{likes}</small></div>
//     )
// }

// export default LikeButton;