import React, { useState } from "react";

const CreatePost = () => {
  const [message, setMessage] = useState("");
  const [token] = useState(window.localStorage.getItem("token"));

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch("/posts", {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: message }),
    });
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      Post:{" "}
      <input
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
