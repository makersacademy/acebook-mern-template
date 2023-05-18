import React, { useState } from 'react';
import './AddPost.css';

const AddPost = ({ onPostAdded }) => { // was passing in navigate but that is not passed into this component in Feed
  console.log("component rendered")
  const [message, setMessage] = useState('');
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const handleSubmit = async (event) => {
    event.preventDefault();

      if (token) {

        const response = await fetch('/posts', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: message,
            comments: []
          })
        })
        if (response.status !== 201) {
          console.log("oops")
        } else {
          console.log("Whoop! whoop!")
          let data = await response.json()
          setMessage('')
          // // window.location.reload() // OLD way of reloading page
          window.localStorage.setItem("token", data.token)
          setToken(window.localStorage.getItem("token"));
          onPostAdded();
        }
      }
  }
  
    const handleMessageChange = (event) => {
      setMessage(event.target.value)
    }

    return (
      <>
        <form onSubmit={handleSubmit}>
          <input className="input-field" placeholder='Message' id="message" type='text' value={message} onChange={handleMessageChange} />
          <input className="input-button" role='submit-button' id='submit' type="submit" value="Add New Post" />
        </form>  
      </>
    )
  }

export default AddPost;
