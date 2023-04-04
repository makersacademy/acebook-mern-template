import React, { useState } from 'react';

const CreatePostForm = ({ navigate }) => {

  const [message, setMessage] = useState(""); //change

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch( '/tokens', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password })
    })

    if(response.status !== 201) {
      console.log("yay")
      navigate('/login')
    } else {
      console.log("oop")
      let data = await response.json()
      window.localStorage.setItem("token", data.token)
        fetch('/post', {
          method: 'post',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({ message: message })
        })
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
