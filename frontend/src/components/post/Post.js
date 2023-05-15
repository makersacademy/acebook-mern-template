import React from 'react';

const Post = ({post}) => {
  var date = new Date(post.createdDateTime); 
  var formattedDate = date.toUTCString()
  return(
    <article data-cy="post" key={ post._id }>{ post.message } { formattedDate } </article>
  )
}

export default Post;
