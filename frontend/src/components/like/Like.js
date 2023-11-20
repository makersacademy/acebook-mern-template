import React from 'react';

const Like = (post) => {
  return (
    <div className="flex-align-vertical post-like-gap">
      <img src='thumb-icon.png' className='like-btn' alt='thumb' />
      <span class="like-count" data-cy="post-likes">{post.post.likes.length}</span>
    </div>
  );
};

export default Like;