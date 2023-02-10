import React, { useState } from "react";

const CreatePost = ({ token }) => {
  const [post, setPost] = useState("");
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch("/post", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ post: post }),
    });

    if (response.status !== 201) {
      console.log("oop");
        navigate("/posts");
    } else {
      console.log("new post created");
        let data = await response.json();
        window.localStorage.setItem("token", data.token);
        setToken(window.localStorage.getItem("token"));
        navigate("/posts");
    }
  };

  const handlePostChange = (event) => {
    setPost(event.target.value);
  };

  if (token) {
    return (
      <>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="What are you thinking?"
            id="newPost"
            type="text"
            rows="5"
            cols="50"
            value={post}
            onChange={handlePostChange}
          ></textarea>

          <input id="submit" type="submit" value="Submit" />
        </form>
      </>
    );
  } else {
    return <></>;
  }
};
export default CreatePost;
