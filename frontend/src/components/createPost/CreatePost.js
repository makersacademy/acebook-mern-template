import React, { useState } from 'react';
import "./CreatePost";

const CreatePost = ({ navigate, fetchPosts }) => {
  const token = window.localStorage.getItem("token")
  const [message, setMessage] = useState('');


  const handleSubmitPost = async (event) => {
    event.preventDefault();
    if (message === '') return;
    if (!message.match(/^[a-zA-Z0-9~!@#()`;\-':,.?| ]*$/)) return;
    
    let response = await fetch('/posts', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ message: message }),
    })

    if (response.status !== 201) {
      navigate('/posts')
    } else {
      let data = await response.json()
      window.localStorage.setItem("token", data.token)
      setMessage("")
      fetchPosts()
    }
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <>
      <form id="submit-post-form" onSubmit={handleSubmitPost}>
        <label id='post-a-message-label'>
          Spew some shit that no one cares about:
        </label>
        <textarea placeholder="Message" id="message" value={message} onChange={handleMessageChange} />
        <div id="message-button-container">
          <input
            class="message-button"
            id='submit'
            type="submit"
            value=":@" />
            <div id="ErrorMessageMessage">{errorHandlerMessage(message)}</div>
          <div id="image-buttons">
            <button class="message-button" id='choose-file-button'>
              Choose file of your ugly child
            </button>
            <button class="message-button" id='upload-file-button'>
              Upload photo of your food no one cares about
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default CreatePost;
