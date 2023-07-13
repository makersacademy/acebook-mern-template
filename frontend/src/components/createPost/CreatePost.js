import React, { useState } from "react";
import "../../index.css";

const CreatePost = ({ handleRefresh }) => {
  const [message, setMessage] = useState("");
  const [token] = useState(window.localStorage.getItem("token"));
  const [file, setFile] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("message", message);
    if (file) {
      formData.append("image", file);
    }

    try {
      const response = await fetch("/posts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setMessage("");
      handleRefresh();
      setFile(null);
    } catch (error) {
      console.error("An error occurred while creating the post", error);
      // Here you could also update your UI to notify the user that an error occurred
    }
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <>
      <h3>What&rsquo;s on your mind?</h3>
      <form
        className="form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        {/* {file ? <img src={URL.createObjectURL(file)} alt="Preview" /> : null} */}
        <textarea
          id="message"
          placeholder="Hello, world!"
          value={message}
          onChange={handleMessageChange}
        ></textarea>
        <br />
        <br />
        Add an image{" "}
        <input id="photo" type="file" onChange={handleFileChange} />
        <br />
        <br />
        <input
          role="submit-button"
          id="submit"
          type="submit"
          value="Submit"
          className="submit-button"
        />
      </form>
    </>
  );
};

export default CreatePost;
