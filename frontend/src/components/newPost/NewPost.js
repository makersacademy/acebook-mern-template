import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import Button from "../button/Button";

const NewPost = ({ getPosts }) => {
  const messageInput = useRef();
  const [isError, setIsError] = useState(false);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsError(false);

    const message = messageInput.current.value.trim();

    if (message.length === 0) {
      setIsError(true);
      messageInput.current.value = "";
      return;
    }

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
      messageInput.current.value = "";
      getPosts();
    }
  };

  return (
    <div className="max-w-sm rounded-2xl border p-4 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          id="message"
          placeholder="What's on your mind?"
          type="text"
          ref={messageInput}
          data-cy="input"
          className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600"
        />
        {isError && (
          <p className="text-red-500">Message can&apos;t be empty.</p>
        )}
        <Button text="Post" type="submit" id="submit" />
      </form>
    </div>
  );
};

NewPost.propTypes = {
  getPosts: PropTypes.func.isRequired,
};

export default NewPost;
