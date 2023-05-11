import React, { useState } from 'react';

const AddPost = ({ newPost, navigate }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch('/posts', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: message })
    })

    if (response.status !== 201) {
      console.log("yay")
      navigate('/posts')
    } else {
      console.log("oops")
      // let data = await response.json()
      // window.localStorage.setItem("token", data.token)
      navigate('/posts');
    }
  }

    const handleMessageChange = (event) => {
      setMessage(event.target.value)
    }

    return (
      <>
        <form onSubmit={handleSubmit}>
          <input placeholder='Message' id="message" type='text' value={message} onChange={handleMessageChange} />
          <input role='submit-button' id='submit' type="submit" value="Submit" />
        </form>
    
      </>
    )
  }


export default AddPost;