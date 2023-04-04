import React, { useState } from 'react';
import { getToken } from '../utils/auth';


const CreatePostForm = ({ navigate }) => {

  const [message, setMessage] = useState(""); //change
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(token) {
    let response = await fetch( '/posts', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`

      },
      body: JSON.stringify({ message: message })
    })

    if(response.status !== 201) {
      console.log("yay")
      navigate('/posts')
    } else {
      console.log("oop")
      let data = await response.json()
      window.localStorage.setItem("token", data.token)
      navigate('/posts'); // new post functionality to post here.
    }
  }

  const handleMessageChange = (event) => {
    setMessage(event.target.value) //what does this do
  }

    return (
      <form onSubmit={handleSubmit}>
          <input placeholder="Message" id="message" type='text' value={ message } onChange={handleMessageChange} />
        <input id='submit' type="submit" value="Submit" />
      </form>
    );
}

export default CreatePostForm;
