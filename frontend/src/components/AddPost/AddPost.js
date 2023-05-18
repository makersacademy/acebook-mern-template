import React, { useState } from 'react';
import './AddPost.css';

const AddPost = () => { // was passing in navigate but that is not passed into this component in Feed
  const [message, setMessage] = useState('');
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const handleSubmit = async (event) => {
    event.preventDefault();

      if (token) {

        console.log(`${message}`) // VISIBILITY
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
          // navigate('/login')
        } else {
          console.log("yay!")
          let data = await response.json()
          console.log(data) // VISIBILITY
          window.location.reload()
          window.localStorage.setItem("token", data.token)
          setToken(window.localStorage.getItem("token"));
          // navigate('/posts'); // navigate is not present in this component
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
