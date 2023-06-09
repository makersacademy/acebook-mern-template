import React, { useState } from "react";

const PostCreateForm = () => {
  const [post, setPost] = useState("");
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const submitPost = async event => {
    // Sends a fetch request to router
    event.preventDefault();
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
      // TODO: What happens if not 201 status?
      console.log("Failed to submit");
    }
  };

  const refreshPage = () => {
    window.location.reload(false);
  };

  const handlePostChange = event => {
    setPost(event.target.value);
  };

  return (
    <form onSubmit={submitPost}>
      <input placeholder="What's on your mind?" id="newPost" type="text" value={post} onChange={handlePostChange} required />
      <input id="submit" type="submit" value="Post" onClick={refreshPage} />
    </form>
  );
};

export default PostCreateForm;
