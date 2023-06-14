import React, { useState } from "react";
import PostUploadWidget from "../cloudinary/PostUploadWidget";

const PostCreateForm = ({token, setToken}) => {
  const [post, setPost] = useState("");
  const [validationError, setValidationError] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const submitPost = async (event) => {
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
        body: JSON.stringify({ message: post, imageUrl: imageUrl, time: time }),
      });

      if (response.status === 201) {
        // TODO: Will need to renavigate back to /posts upon 201 status
        let data = await response.json();
        setToken(data.token);
        setPost("");
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

  const handlePostChange = event => {
    setPost(event.target.value);
  };

  return (
    <form onSubmit={submitPost} noValidate>
      <input placeholder="What's on your mind?" id="newPost" type="text" value={post} onChange={handlePostChange} required />
      <PostUploadWidget setImageUrl={setImageUrl}/>
      <input id="submit" type="submit" value="Post"/>
      <p className="validation-error">{validationError}</p>
    </form>
  );
};

export default PostCreateForm;
