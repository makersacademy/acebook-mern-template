import React, { useState } from "react";

const CreatePost = ({ token, navigate }) => {
  const [post, setPost] = useState("");
  const handlePostChange = (event) => {
    setPost(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch("/newPost", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ post: post }),
    });

    if (response.status === 201) {
      console.log("new post created");
        navigate("/posts");
    } else {
      console.log("oops");
        let data = await response.json();
        window.localStorage.setItem("token", data.token);
        navigate("/posts");
    }
  };

  if (token) {
    return (
      <>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="what are you thinking?"
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
