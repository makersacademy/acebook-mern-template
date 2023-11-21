import React from 'react';
import LikeButton from './LikeButton';
import LikeNumber from './LikeNumber';
import { useState } from 'react';

const Like = (props) => {
  const userID = 1
  
  const [count, setCount] = useState(props.post.likes.length)
//   return (
//     <div className="flex-align-vertical post-like-gap">
//       <img src='thumb-icon.png' className='like-btn' alt='thumb' onClick={handleLike}/>
//       <span className="like-count" data-cy="post-likes">{post.post.likes.length}</span>
//     </div>
//   );\
  return (
      // Display a button component (thumb) that handles the logic for liking and unliking
        // contains the logic of how we increment the number when clicked
    <div className="flex-align-vertical post-like-gap">
      <LikeButton setCount={setCount} count={count}/>
      <LikeNumber count={count}/>
    </div>


      // Display a number component displaying the number
  )
};


export default Like;

