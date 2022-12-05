import React, { useState } from "react";

const NewCommentForm = ({ navigate, post }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [content, setContent] = useState("");

  const commentSubmit = async (event) => {
    event.preventDefault();

    fetch("/comments", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ comment: content, postId: post._id }),
    }).then(async (response) => {
      if (response.status === 201) {
        const data = await response.json();
        window.localStorage.setItem("token", data.token);
        setToken(window.localStorage.getItem("token"));
        // navigate("/signup"); // TODO:  Navigation appears broken here. Not sure why.
      } else {
        navigate("/login");
      }
    });
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  return (
    <form onSubmit={commentSubmit}>
      <input
        placeholder="Comment here..."
        id="content"
        type="text"
        value={content}
        onChange={handleContentChange}
      />
      <input id="submit" type="submit" value="Submit Comment" />
    </form>
  );
};

export default NewCommentForm;
