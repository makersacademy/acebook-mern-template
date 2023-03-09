
import React, { useState } from "react";

function CreatePost() {
  const [postMessage, setPostMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    //const token = localStorage.getItem("jwt");
    const token = window.localStorage.getItem("token");

    const formattedMessge = { "message":  postMessage }

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
    <form onSubmit={handleSubmit} className='post-form'>
      <label htmlFor="post-text" className="post-label">What's on your mind?</label>
      <textarea
        className="post-input"
        id="post-input"
        value={postMessage}
        onChange={(event) => {
          setPostMessage(event.target.value)
          //console.log(event.target.value)
        }}
      />
      <button id="submit" className="submit-button">Post</button>
    </form>
  );
}

export default CreatePost;
