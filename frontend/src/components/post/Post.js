import React from 'react';
import Comment from '../comment/Comment';
const Post = ({post}) => {
  let comments = post.comments
  console.log("Comments", comments)
  let commentList = comments.map(
    (comment) => ( <p> <Comment comment={ comment } key={ comment._id }  /> </p>)
  )
  return(
    <article data-cy="post" key={post._id}>
      <h2>{post.user}:</h2>
      <p>{post.message}</p>
      <div>{commentList}</div>
    </article>
  )
}


export default Post;


