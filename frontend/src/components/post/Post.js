import React from 'react';
import Card from '../Helpers/Card'

const Post = ({post}) => {
  return(
    <Card>
      <article data-cy="post" key={ post._id }>{ post.message }</article>
    </Card>
  )
}

export default Post;
