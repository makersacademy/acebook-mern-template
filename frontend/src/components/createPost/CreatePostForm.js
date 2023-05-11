import React, { useState } from 'react';

const CreatePostForm = ({ onCreated }) => {
  const [message, setMessage] = useState("");
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch( '/posts', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ message: message })
    })

    setMessage("")
    onCreated();
  }

  const handleMessageChange = (event) => {
    setMessage(event.target.value)
  }

    return (
      <>
      <form onSubmit={handleSubmit} id="postForm">
        <h1>Make a post</h1>
        <textarea rows="4" cols="50" placeholder='Write your post here...' id="message" value={ message } onChange={handleMessageChange} form="postForm"/>
        <input role='submit-button' id='submit' type="submit" value="Submit" />
      </form>
      </>
    );
}

export default CreatePostForm;
