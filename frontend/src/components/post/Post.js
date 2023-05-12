import React, { useState } from 'react';
import Like from '../like/Like'

const Post = ({post}) => {

  const [isLiked, setIsLiked] = useState(true)

  return(
    <>
    <article data-cy="post" key={ post._id }>{ post.message }</article>
    <Like post_id={ post._id } isLiked={isLiked}/>
    </>
  )
}

export default Post;
