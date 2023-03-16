import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "../button/Button";

const NewComment = ({ postId, getComments }) => {
  const [commentMessage, setCommentMessage] = useState("");
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("/posts/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message: commentMessage, postId }),
    });

    if (response.status !== 201) {
      const data = await response.json();
      console.log(JSON.stringify(data));
    } else {
      const data = await response.json();
      window.localStorage.setItem("token", data.token);
      setToken(data.token);
      setCommentMessage("");
      getComments();
    }
  };

  const handleCommentChange = (event) => {
    setCommentMessage(event.target.value);
  };

  return (
    <div className="max-w-sm rounded-xl border p-4 shadow-sm">
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
        data-cy="new-comment-form"
      >
        <input
          id="comment-input"
          type="text"
          placeholder="Want to comment?"
          required
          value={commentMessage}
          onChange={handleCommentChange}
          data-cy="comment-input"
          className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600"
        />
        <Button
          text="Comment"
          type="submit"
          id="submit-comment-btn"
          isDisabled={commentMessage.length === 0}
        />
      </form>
    </div>
  );
};

NewComment.propTypes = {
  getComments: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
};

export default NewComment;
