import React, { useState } from "react";
import './CreatePost.css'

function CreatePost() {
  const [postMessage, setPostMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    //const token = localStorage.getItem("jwt");
    const token = window.localStorage.getItem("token");

    const formattedMessge = { "message": postMessage }

    fetch('/posts', {
      method: 'POST',
      body: JSON.stringify(formattedMessge),
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
  };

  return (
    <form id='formCreatePost' onSubmit={handleSubmit} className='post-form'>
      <textarea id="textCreatePost" className="post-input" placeholder="What's on your mind?" value={postMessage} onChange={(event) => { setPostMessage(event.target.value) }}></textarea>
      <button id="submitButton" className="submit-button">Post</button>
    </form>
  );
}

export default CreatePost;
