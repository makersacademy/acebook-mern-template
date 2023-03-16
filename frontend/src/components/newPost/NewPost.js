import React, { useState, useContext, useRef } from "react";
import PropTypes from "prop-types";
import Button from "../button/Button";
import useUpload from "../../hooks/useUpload";
import { AuthContext } from "../../contexts/AuthContext";

const NewPost = ({ getPosts }) => {
  const messageInputRef = useRef();
  const imageInputRef = useRef();
  const [imageInput, setImageInput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { token, setToken } = useContext(AuthContext);
  const upload = useUpload();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setIsError(false);

    const message = messageInputRef.current.value.trim();
    if (message.length === 0 && !imageInput) {
      setIsError(true);
      messageInputRef.current.value = "";
      imageInputRef.current.value = null;
      setImageInput(null);
      setIsLoading(false);
      return;
    }

    const publicId = await upload(imageInput);

    const response = await fetch("/posts", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message, image: publicId }),
    });

    if (response.status !== 201) {
      console.log("error");
      // present error modal
    } else {
      const data = await response.json();
      setToken(data.token);
      messageInputRef.current.value = "";
      imageInputRef.current.value = null;
      setImageInput(null);
      getPosts();
    }
    setIsLoading(false);
  };

  return (
    <div className="max-w-sm rounded-2xl border p-4 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          id="message"
          placeholder="What's on your mind?"
          type="text"
          ref={messageInputRef}
          data-cy="input"
          className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600"
        />
        <input
          data-cy="file"
          type="file"
          ref={imageInputRef}
          onChange={(e) => setImageInput(e.target.files[0])}
        />
        {isError && (
          <p data-cy="error-message" className="text-red-500">
            Message and Image can&apos;t both be empty.
          </p>
        )}
        <Button
          text={`${isLoading ? "Uploading..." : "Post"}`}
          type="submit"
          id="submit"
          isDisabled={isLoading}
        />
      </form>
    </div>
  );
};

NewPost.propTypes = {
  getPosts: PropTypes.func.isRequired,
};

export default NewPost;
