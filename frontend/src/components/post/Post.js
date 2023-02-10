import React, { useState } from 'react';
import './Post.css';
import DeleteButtonPost from './DeleteButtonPost';
// in posts we are calling the button  what does the request to delete the post

const Post = ({post}) => {
  const [isDeleted, setIsDeleted] = useState(false);

  return isDeleted ? (
    <div>{console.log("post was deleted :)")}</div>
  ) : (
    <div className="post">
      <article data-cy="post" key={ post._id }>{ post.message }</article>
      <DeleteButtonPost post={post} id={post._id} setIsDeleted={setIsDeleted} /> 
    </div>
  );
};

export default Post;
