
import React, { useState } from "react";

function CreatePost() {
  const [postMessage, setPostMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("jwt");

    fetch('/post', {
      method: 'POST',
      body: JSON.stringify({postMessage}),
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
      console.log(`Error: ${error}`)
    })

    setPostMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className='post-form'>
      <label htmlFor="post-text" className="post-label">What's on your mind?</label>
      <textarea
        className="post-input"
        value={postMessage}
        onChange={(event) => {
          setPostMessage(event.target.value)
        }}
      />
      <button className="submit-button">Post</button>
    </form>
  );
}

export default CreatePost;
