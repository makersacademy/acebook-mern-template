import React, { useState } from 'react';
import './Post.css';


const Post = ({ post }) => {
  const currentUserId = window.localStorage.getItem("currentUserId")
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [liked, setLiked] = useState(post?.likes?.includes(currentUserId));
  const length =post?.likes?.length;
  const [likesCount, setLikesCount] = useState(length);
  const handleLike = async() => {
    try {
      const response = await fetch(`posts/${post._id}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          
        }),
      });
      
      if (response.status === 201) {
        const data = await response.json();
        console.log(data)
        setLiked(true);
        setLikesCount(data.likes.length);
      }
    } catch (error) {
      console.error(error);
    }
  };
  if (post.user === null){
    return( 
      <article data-cy="post" > <p>ERROR</p></article>
    )
  }
  else{
    return(
      <article data-cy="post" ><div className="post" key={ post._id }><h2>{ post.user.username }:</h2><p><h1>{ post.message }</h1></p>
      <button onClick={handleLike} disabled={liked}>
        {liked ? 'Liked' : 'Like'}
      </button>
      <span>{likesCount} {likesCount === 1 ? 'like' : 'likes'}</span></div></article>
    )
  }
}


export default Post;


