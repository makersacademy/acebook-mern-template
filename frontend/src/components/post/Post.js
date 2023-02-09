import React from 'react';
import './Post.css';

const Post = ({post}) => {
  const token = localStorage.getItem('token');

  const handleClick = async () => {
    try {
      await fetch(`/posts/${post._id}`, {
        method: 'delete',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (err) {
      console.error(err.message);
    }
  };
  
  return(
    <div className="post">
      <article data-cy="post" key={ post._id }>{ post.message }</article>
      <button onClick={handleClick}>delete post</button>
    </div>
  )
};

export default Post;
