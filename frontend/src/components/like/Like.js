import React from 'react';
import LikeButton from './LikeButton';
import LikeNumber from './LikeNumber';
import { useState } from 'react';

const Like = ({post, userId}) => {
  const [userIDList, setUserIDList] = useState(post.likes)


  return (

    <div className="flex-align-vertical post-like-gap">
      <LikeButton setUserIDList={setUserIDList} userIDList={userIDList} userId={userId} postId={post._id}/>
      <LikeNumber userIDList={userIDList}/>
    </div>

  )
};


export default Like;

