import React, { useState } from "react";


const CreatePost = ({ navigate }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState("");
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch("/posts", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: title,  content: content, photo: photo }),
    });

    if (response.status !== 201) {
      console.log("new post not created")
      navigate("/posts")
    } else {
      console.log("new post created")
        let data = await response.json()
        window.localStorage.setItem("token", data.token)
        setToken(window.localStorage.getItem("token"))
        setTitle("")
        setContent("")
        navigate("/posts");
    }
  };

   const handleTitleChange = (event) => {
     setTitle(event.target.value);
   };

  const handlePostChange = (event) => {
    setContent(event.target.value);
  };

  const handlePhotoChange = (event) => {
    setPhoto(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <br></br>
        <input
          placeholder="Title"
          id="title"
          type="text"
          value={title}
          onChange={handleTitleChange}
        ></input>
        <br></br>

        <label htmlFor="content">Content:</label>
        <br></br>
        <textarea
          placeholder="Content"
          id="content"
          name="content"
          type="text"
          rows="5"
          cols="50"
          value={content}
          onChange={handlePostChange}
        ></textarea>
        <br></br>

        <label htmlFor="photo">Photo:</label>
        <br></br>
        <input
          type="file"
          id="photo"
          name="photo"
          value={photo}
          onChange={handlePhotoChange}
        ></input>
        <br></br>
        <br></br>

        <button id="submit" type="submit">
          Create post
        </button>
      </form>
    </div>
  );
};
export default CreatePost;