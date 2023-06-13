import React, { useState } from "react";

const PostCreateForm = () => {
  const [post, setPost] = useState("");
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [validationError, setValidationError] = useState("");

  const submitPost = async event => {
    // Sends a fetch request to router
    event.preventDefault();

    if (validateInput()) {
      let time = new Date();

      let response = await fetch("/posts", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: post, time: time }),
      });

      if (response.status === 201) {
        // TODO: Will need to renavigate back to /posts upon 201 status
        console.log("Successfully submitted");
        return refreshPage();
      } else {
        console.log("Failed to submit");
        setValidationError("Server error");
      }
    }
  };

  const validateInput = () => {
    if (post.length > 0) {
      setValidationError("");
      return true;
    } else {
      setValidationError("Please enter a post");
      return false;
    }
  };

  const refreshPage = () => {
    window.location.reload(false);
  };

  const handlePostChange = event => {
    setPost(event.target.value);
  };

  return (
    <form onSubmit={submitPost} noValidate>
      <input placeholder="What's on your mind?" id="newPost" type="text" value={post} onChange={handlePostChange} required />
      <input id="submit" type="submit" value="Post" />
      <p className="validation-error">{validationError}</p>
    </form>
  );
};

export default PostCreateForm;
