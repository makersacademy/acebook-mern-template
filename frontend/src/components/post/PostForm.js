import React, { useState } from "react";

const PostForm = (props) => {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null); // Add state for the image file

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("message", message);
    if (image) {
      formData.append("image", image);
    }
    console.log(formData.get("message"));
    console.log(formData.get("image"));

    fetch("/posts", {
      method: "post",
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response data:", data);
        if (data.post) {
          props.onNewPost(data.post);
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
        <button type="submit">Post</button>
      </form>
    </>
  );
};

export default PostForm;
