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
      <h2 className="post-form-title">Got something to share?</h2>
      <form className="post-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Share it here..."
          value={message}
          onChange={handleMessageChange}
          className="post-form-input"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="post-form-file"
        />
        <button type="submit" className="post-form-button">
          Share Now
        </button>
      </form>
    </>
  );
};

export default PostForm;
