import React, { useState, useEffect } from "react";
import errorHandlerMessage from "../errorHandling/errorHandlerMessage";
import "./CreatePost";
import { storage } from "./firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import "./CreatePost.css";

const CreatePost = ({ navigate, fetchPosts }) => {
  const token = window.localStorage.getItem("token");
  const [message, setMessage] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, "images/");

  const handleSubmitPost = async (event) => {
    event.preventDefault();
    if (imageUpload === "" && message === "") return;
    if (!message.match(/^[a-zA-Z0-9~!@#()`;\-':,.?| ]*$/)) return;

    UploadImage();

    let response = await fetch("/posts", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message: message, imageUrls: imageList }),
    });

    if (response.status !== 201) {
      navigate("/posts");
    } else {
      let data = await response.json();
      window.localStorage.setItem("token", data.token);
      setMessage("");
      fetchPosts();
    }
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const UploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList((prev) => [...prev, url]);
      });
    });
  };

  useEffect(() => {
    listAll(imageListRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  return (
    <>
      <form id="submit-post-form" onSubmit={handleSubmitPost}>
        <label id="post-a-message-label">
          Spew some shit that no one cares about:
        </label>
        <textarea
          placeholder="Message"
          id="message"
          value={message}
          onChange={handleMessageChange}
        />
        <div id="message-button-container">
          <input class="message-button" id="submit" type="submit" value=":@" />
          <div id="ErrorMessageMessage">
            {errorHandlerMessage(message)}
          </div>{" "}
        </div>
        <input
          type="file"
          onChange={(event) => {
            setImageUpload(event.target.files[0]);
          }}
        />
        <button onClick={UploadImage}>Upload Photo</button> <br></br>
        {imageList
          .map((url) => {
            return <img src={url} class="center" />;
          })
          .reverse()}{" "}
      </form>
    </>
  );
};

export default CreatePost;
