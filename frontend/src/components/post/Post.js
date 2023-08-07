import React from 'react';


const Post = ({post}) => {
  if (post.user === null){
    return( 
      <article data-cy="post" > <p>ERROR</p></article>
    )
  }
  else{
    return(
      <article data-cy="post" key={ post._id }><h2>{ post.user.username }:</h2><p>{ post.message }</p></article>
    )
  }
}


export default Post;


