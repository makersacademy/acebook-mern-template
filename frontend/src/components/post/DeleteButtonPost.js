import React from 'react';
import { useState } from 'react';


const DeleteButtonPost = ({post, id, setIsDeleted}) => {
  const token = localStorage.getItem('token');


  const handleClick = async () => {
    console.log(post)
    try {
      await fetch(`/posts/${post._id}`, {
        method: 'delete',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      setIsDeleted(true);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="post">
      <button onClick={handleClick}>delete post</button>
    </div>
  );
};

export default DeleteButtonPost;