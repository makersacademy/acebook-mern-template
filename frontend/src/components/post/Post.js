// import React from 'react';

// const Post = ({post}) => {
//   return(
//     <article data-cy="post" key={ post._id }>{ post.message }</article>
//   )
// }

// export default Post;

// post.comment. i need an area for someone to make a comment
// this is also where we can add our likes

// add text area
// add submit button
// setup handleSubmit

// make a like component 

// research making a folder called fetchers

import React, { useState } from 'react';
import LikeButton from '../LikeButton/LikeButton';

const Post = ({post}) => {
  const [likeCount, setLikeCount] = useState(post.likeCount);

  const handleLike = () => {
    setLikeCount(likeCount + 1); // Update the like count when the button is clicked
  };

  return (
    <article data-cy="post" key={post._id}>
      {post.message} {likeCount}
      <LikeButton onLike={handleLike} />
    </article>
  );
};

export default Post;