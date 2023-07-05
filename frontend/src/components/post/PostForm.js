import React, { useState } from "react";

const PostForm = (props) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("/posts", {
      method: "post",
      headers: {
        Authorization: `Bearer ${props.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response data:", data);
        if (data.post) {
          props.onNewPost(data.post);
          setMessage("");
        }
      });
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <>
      <h2>Create New Post</h2>
      <form className="post-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your post"
          value={message}
          onChange={handleMessageChange}
        />
        <button type="submit">Post</button>
      </form>
    </>
  );
};

export default PostForm;
