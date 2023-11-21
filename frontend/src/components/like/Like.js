import React from 'react';
import LikeButton from './LikeButton';
import LikeNumber from './LikeNumber';
import { useState } from 'react';

const Like = ({post, userId}) => {
  const [userIDList, setUserIDList] = useState(post.likes)
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
      <LikeButton setUserIDList={setUserIDList} userIDList={userIDList} userId={userId}/>
      <LikeNumber count={userIDList.length}/>
    </div>


      // Display a number component displaying the number
  )
};


export default Like;

