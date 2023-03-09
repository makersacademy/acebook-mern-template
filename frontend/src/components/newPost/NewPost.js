import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "../button/Button";

const NewPost = ({ getPosts }) => {
  const [message, setMessage] = useState("");
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("/posts", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message }),
    });

    if (response.status !== 201) {
      console.log("error");
      // present error modal
    } else {
      const data = await response.json();
      window.localStorage.setItem("token", data.token);
      setToken(data.token);
      getPosts();
    }
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <div className="max-w-sm">
      <form onSubmit={handleSubmit}>
        <input
          id="message"
          placeholder="What's on your mind?"
          type="text"
          required
          value={message}
          onChange={handleMessageChange}
          className="w-full"
        />
        <Button text="Post" type="submit" id="submit" />
      </form>
    </div>
  );
};

NewPost.propTypes = {
  getPosts: PropTypes.func.isRequired,
};

export default NewPost;
