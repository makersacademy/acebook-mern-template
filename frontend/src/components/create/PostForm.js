import React, { useEffect, useState } from 'react';

const PostForm = ({ navigate }) => {
  const [message, setMessage] = useState("");
  const [token, setToken] = useState(window.localStorage.getItem("token"));
 
  useEffect(() => {
    if(token) {
      fetch("/posts", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(async data => {
          window.localStorage.setItem("token", data.token)
          setToken(window.localStorage.getItem("token"))

        })
    }
  })

  const handlePostSubmit = async (event) => {
    event.preventDefault();

    if(token) fetch('/posts', {
      method: 'post',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({token: token, message: message})
    })
      .then(response => response.json())
      .then(
        data => {          
        window.localStorage.setItem("token", data.token)
        setToken(window.localStorage.getItem("token"))
        console.log(data)
      })
  }

  const handleMessageChange = (event) => {
    setMessage(event.target.value)
  }

    return (
      <form onSubmit={handlePostSubmit}>
        <p>Create a new post</p>
        <input placeholder='Message' id="message" type='text' value={ message } onChange={handleMessageChange} />
        <br />
        <input id='submit' type="submit" value="Submit" />
        <div class="footer">
         <p>Ⓒ The Incredibles</p>
      </div>
      </form>
    );
}

export default PostForm;