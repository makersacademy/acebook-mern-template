import React, { useState } from "react";

const PostForm = ({ token, onNewPost }) => {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("message", message);
    if (image) {
      formData.append("image", image);
    }

    fetch("/posts", {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.post) {
          onNewPost(data.post);
          setMessage("");
          setImage(null);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
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
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button id="post-submit" type="submit">
          Post
        </button>
      </form>
    </>
  );
};

export default PostForm;
