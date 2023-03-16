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
    <div className="rounded-2xl border border-gray-100 bg-white p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          id="message"
          placeholder="What's on your mind?"
          type="text"
          ref={messageInputRef}
          data-cy="input"
          className="relative block w-full rounded-md border border-gray-100 p-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-transparent"
        />
        <div className="flex items-center gap-4">
          <input
            data-cy="file"
            type="file"
            ref={imageInputRef}
            onChange={(e) => setImageInput(e.target.files[0])}
          />
          <Button
            text={`${isLoading ? "Uploading..." : "Post"}`}
            type="submit"
            id="submit"
            buttonStyle="outline"
            className="max-w-xs"
            isDisabled={isLoading}
          />
        </div>
        {isError && (
          <p
            data-cy="error-message"
            className="rounded-md bg-red-50 p-4 text-red-500"
          >
            Message and Image can&apos;t both be empty.
          </p>
        )}
      </form>
    </div>
  );
};

NewPost.propTypes = {
  getPosts: PropTypes.func.isRequired,
};

export default NewPost;
