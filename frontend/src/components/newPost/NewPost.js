import React, { useState } from "react";

const NewPost = () => {
  const [message, setMessage] = useState("");
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  // temporary author
  const [author] = useState("6404b4c6c8a91aca3bb4a2d9");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("/posts", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message, author }),
    });

    if (response.status !== 201) {
      console.log("error");
      // present error modal
    } else {
      const data = await response.json();
      window.localStorage.setItem("token", data.token);
      setToken(data.token);
      // navigate("/posts");
    }
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        id="message"
        placeholder="What's on your mind?"
        type="text"
        required
        value={message}
        onChange={handleMessageChange}
      />
      <button id="submit" type="submit">
        Post
      </button>
    </form>
  );
};

export default NewPost;
