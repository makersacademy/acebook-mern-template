import React, { useState } from 'react';

const Post = ({post}) => {

  const [message, setMessage] = useState("")

  const handleSubmit = async (event) => {

  }

   
  return(
    
    <article data-cy="post" key={ post._id }>{ post.message }</article>
  )
}

export default Post;
