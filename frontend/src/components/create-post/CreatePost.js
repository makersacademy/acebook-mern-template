import React, { useState } from "react";
import "./CreatePost.css";
const CreatePost = ({ fetchData }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    let response = await fetch("/posts", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ message: message }),
    });

    if (response.status === 201) {
      console.log("post is successful");
      fetchData();
    } else {
      console.log("post did not complete");
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
