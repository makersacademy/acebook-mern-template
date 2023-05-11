import React, { useState } from 'react';

const AddPost = ({ navigate }) => {
  const [message, setMessage] = useState('');
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const handleSubmit = (event) => {
    event.preventDefault();

      if (token) {

        console.log(`{message}`) // VISIBILITY
        fetch('/posts', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: message })
        })
          .then(response => response.json())
          .then(async data => {
            window.localStorage.setItem("token", data.token);
            setToken(window.localStorage.getItem("token"));
            console.log(data) // VISIBILITY
            // navigate('./login')
            // Should trigger a reload of all posts
          })
          
      }
      
  }
  // let response = await fetch('/tokens', {
  //   method: 'post',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ email: email, password: password })
  // })



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