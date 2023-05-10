import React, { useState } from 'react';

const CreatePostForm = ({ navigate }) => {
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

    if(response.status !== 201) {
      //bad reponse
      console.log("bad response - != 201")
      //refresh posts
      navigate('/posts')
    } else {
      //good response
      console.log("Good response - 201")
      //refresh posts
      navigate('/posts');
    }
  }

  const handleMessageChange = (event) => {
    setMessage(event.target.value)
  }

    return (
      <form onSubmit={handleSubmit}>
        <input placeholder='Write your post here' id="message" type='text' value={ message } onChange={handleMessageChange} />
        <input role='submit-button' id='submit' type="submit" value="Submit" />
      </form>
    );
}

export default CreatePostForm;
