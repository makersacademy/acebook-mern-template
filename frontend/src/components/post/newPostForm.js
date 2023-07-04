import React, { useState } from "react";

const NewPostForm = ({ createNewPost }) => {
  const [newPost, setNewPost] = useState("");

  const handleNewPostChange = (event) => {
    setNewPost(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createNewPost(newPost);
    setNewPost("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Write a new post..."
        value={newPost}
        onChange={handleNewPostChange}
      />
      <button type="submit">Create Post</button>
    </form>
  );
};

export default NewPostForm;
