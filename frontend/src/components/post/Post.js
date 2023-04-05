import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons/faThumbsUp'

const Post = ({post}) => {
  return(
    <div>
    <article data-cy="post" key={ post._id }> <div>{ post.user.name }</div><div>{ post.message }</div> </article>
    <FontAwesomeIcon icon={faThumbsUp} />
    </div>
  )
}

export default Post;
