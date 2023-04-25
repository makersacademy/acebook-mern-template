import React, { useState } from "react";
import SubmitButton from "../submitButton/SubmitButton";

const NewPost = ({ navigate }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [message, setMessage] = useState("");

  const submitMessage = () => {
    if (token) {
      fetch("/api/posts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message,
        }),
      })
        .then((response) => response.json())
        .then(async (data) => {
          window.localStorage.setItem("token", data.token);
          setToken(window.localStorage.getItem("token"));
        });
    }
    console.log("it works!");
    navigate("/posts");
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitMessage();
        }}
        id="post"
        className="new-post-form">
        <input
          type="text"
          class="new-post-input"
          placeholder="Tell people how you're feeling..."
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
      </form>
      <SubmitButton text={"Add to Feed"} form={"post"} />
    </>
  );
};

export default NewPost;
