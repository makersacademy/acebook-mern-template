import React from 'react';

const Post = ({post, userId}) => {

  const postLiked = (event) => {
    console.log("You like this: " + post.message + "\nUserId: + " + userId);
  }

  return(
    <article data-cy="post" key={ post._id }>
      <p>{ post.message }</p>
      <button onClick={postLiked}>Like</button>
    </article>
  )
}

export default Post;
