import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons/faThumbsUp'

const Post = ({post}) => {
  return(
    <div>
    <article data-cy="post" key={ post._id }>{ post.message }</article>
    <FontAwesomeIcon icon={faThumbsUp} />
    </div>
  )
}

export default Post;
