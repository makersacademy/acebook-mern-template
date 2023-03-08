import React, { useState } from "react";

const CreatePost = () => {
  const [message, setMessage] = useState("");
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch("/posts", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("token")}`
      },
      body: JSON.stringify({ message: message, user: window.localStorage.getItem("user_id") }),
    });
  
    if (response.status === 201) {
      console.log('post is successful');
      window.location.reload()
    } else {
      console.log('post did not complete')
    } 
  }; 

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Message"
        id="message"
        type="text"
        value={message}
        onChange={handleMessageChange}
      />
      <input role="submit-button" id="submit" type="submit" value="Submit" />
    </form>
  );
};

export default CreatePost;
