import React from 'react';

const Like = (post) => {
  const userID = 1
  const handleLike = () => {
    post.post.likes.push(userID) 
    console.log(post.post.likes)
  }
  return (
    <div className="flex-align-vertical post-like-gap">
      <img src='thumb-icon.png' className='like-btn' alt='thumb' onClick={handleLike}/>
      <span className="like-count" data-cy="post-likes">{post.post.likes.length}</span>
    </div>
  );
};

export default Like;