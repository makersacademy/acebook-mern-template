import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import Button from "../button/Button";
import { TokenContext } from "../../contexts/tokenContext";

const NewPost = ({ getPosts }) => {
  const [message, setMessage] = useState("");
  const { token, setToken } = useContext(TokenContext);

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
      setMessage("");
      getPosts();
    }
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <div className="max-w-sm rounded-2xl border p-4 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          id="message"
          placeholder="What's on your mind?"
          type="text"
          required
          value={message}
          onChange={handleMessageChange}
          data-cy="input"
          className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600"
        />
        <Button
          text="Post"
          type="submit"
          id="submit"
          isDisabled={message.length === 0}
        />
      </form>
    </div>
  );
};

NewPost.propTypes = {
  getPosts: PropTypes.func.isRequired,
};

export default NewPost;
