import { Navigate } from 'react-router-dom';
import React, { useContext, useState } from "react";
import { UserContext } from '../../context/UserContext';
import './CreatePost.css'

function CreatePost(props) {

  const [postMessage, setPostMessage] = useState("");
  const { userInfo } = useContext(UserContext)

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = window.localStorage.getItem("token");
    
    const formattedMessage = { "message":  postMessage, "poster": userInfo._id }
    console.log(formattedMessage)
    console.log("JSON POST = ", JSON.stringify(formattedMessage));


    fetch('/posts', {
      method: 'POST',
      body: JSON.stringify(formattedMessage),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
      .then(response => {
        if (response.ok) {
          console.log('Success.')
        } else {
          throw new Error('Something went wrong.');
        }
      })
      .catch(error => {
        console.log(error)
      })

    setPostMessage("");
    props.refreshPosts();
  };

  return (
    <form id='formCreatePost' onSubmit={handleSubmit} className='post-form'>
      <textarea
      placeholder='Whats on your mind? 🧐'
        className="post-input"
        id="textCreatePost"
        value={postMessage}
        onChange={(event) => {
          setPostMessage(event.target.value)
        }}
      />
      <button id="submitButton" className="submit-button">Post</button>
    </form>
  );
}

export default CreatePost;
