import React, {useState } from 'react';

const Post = ({post}) => {

  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch( '/users,', {
      method: 'post', 
      header: {
        'content-Type': 'application/json',
      },
      body: JSON.stringify({message: message})
    })
  }

  

  return(
    <>
  
    <article data-cy="post" key={ post._id }>{ post.message }</article>

    </>
  )
}

export default Post;

// import useState

// const [message, setmessage] = useState("")

// const handleSubmit