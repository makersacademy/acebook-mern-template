import React, { useState } from "react";

const CreatePost = ({}) => {
  const [post, setPost] = useState("");
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch("/posts", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message: post }),
    });

    if (response.status !== 201) {
      console.log("new post not created")
      // navigate("/posts")
    } else {
      console.log("new post created")
        let data = await response.json()
        window.localStorage.setItem("token", data.token)
        setToken(window.localStorage.getItem("token"))
        // navigate("/posts");
    }
  };

  const handlePostChange = (event) => {
    setPost(event.target.value);
  };

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="What are you thinking?"
            id="newpost"
            type="text"
            rows="5"
            cols="50"
            value={post}
            onChange={handlePostChange}
          ></textarea>

          <button id="submit" type="submit">Create post</button>
        </form>
      </div>
    );
};
export default CreatePost;
