import React, { useState } from "react";

const NewPostForm = ({ navigate }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [content, setContent] = useState("");

  const postSubmit = async (event) => {
    event.preventDefault();

    console.log(content);

    fetch("/posts", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message: content }),
    }).then(async (response) => {
      if (response.status === 201) {
        const data = await response.json();
        window.localStorage.setItem("token", data.token);
        setToken(window.localStorage.getItem("token"));
        console.log(data);
        console.log(data.token);
        console.log(token);
        navigate("/posts");
      } else {
        navigate("/login");
      }
    });
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  return (
    <form onSubmit={postSubmit}>
      <input
        placeholder="Your post content"
        id="content"
        type="text"
        value={content}
        onChange={handleContentChange}
      />
      <input id="submit" type="submit" value="Submit" />
    </form>
  );
};

export default NewPostForm;
