import React, { useState } from "react";


const CreatePost = ({navigate}) => {
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
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
      body: JSON.stringify({ content: post, 
        title: title, 
        photo: photo 
      }),
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
        setPost("")
        navigate("/posts");
    }
  };

  const handlePostChange = (event) => {
    setPost(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handlePhotoChange = (event) => {
    setPhoto(event.target.value);
  }

    return (
      <>
        <form onSubmit={handleSubmit}>
          <label for="title">Title</label><br></br>
          <input
            placeholder="Title"
            id="title"
            type="text"
            value={title}
            onChange={handleTitleChange}
          ></input>
          <br></br>
  
          <label for="content">Content:</label><br></br>
          <textarea
            placeholder="Content"
            id="content"
            name="content"
            type="text"
            rows="5"
            cols="50"
            value={post}
            onChange={handlePostChange}
          ></textarea>
          <br></br>

          <label for="photo">Photo:</label><br></br>
          <input 
            type="file" 
            id="photo" 
            name="photo" 
            value={photo} 
            onChange={handlePhotoChange}></input>
          <br></br>
          <br></br>

          <button id="submit" type="submit">Create post</button>
        </form>
      </>
    );
};
export default CreatePost;
