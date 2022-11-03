import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import "./Feed.css";
import { storage } from "./firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [message, setMessage] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, "images/");

  useEffect(() => {
    if (token) {
      fetch("/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then(async (data) => {
          window.localStorage.setItem("token", data.token);
          setToken(window.localStorage.getItem("token"));
          setPosts(data.posts);
        });
    }
  }, [token]);

  const handleSubmitPost = async () => {
    if (message === "") return;
    let response = await fetch("/posts", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message: message }),
    });

    if (response.status !== 201) {
      navigate("/posts");
    } else {
      let data = await response.json();
      window.localStorage.setItem("token", data.token);
    }
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const logout = () => {
    window.localStorage.removeItem("token");
    navigate("/login");
  };

  const UploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then(() => {
      alert("Image Uploaded");
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

  if (token) {
    return (
      <>
        <h2>Posts</h2>
        <input
          type="file"
          onChange={(event) => {
            setImageUpload(event.target.files[0]);
          }}
        />
        <button onClick={UploadImage}>Upload Photo</button> <br></br>
        {imageList.map((url) => {
          // eslint-disable-next-line jsx-a11y/alt-text
          return <img src={url} />;
        })}{" "}
        <br></br>
        <button id="logout-button" onClick={logout}>
          Logout
        </button>
        <div id="message-box">
          <form onSubmit={handleSubmitPost}>
            <br></br>
            <label>
              Post a message:
              <br></br>
              <textarea
                placeholder="Message"
                id="message"
                value={message}
                onChange={handleMessageChange}
              />
            </label>
            <br></br>
            <br></br>
            <input id="submit" type="submit" value="Submit" />
          </form>
        </div>
        <div id="feed" role="feed">
          {posts.map((post) => <Post post={post} key={post._id} />).reverse()}
        </div>
        <div id="kyle">
          <img
            src="https://i.postimg.cc/T5vGJyXj/kyle.png"
            border="0"
            alt="kyle"
          />
        </div>
      </>
    );
  } else {
    navigate("/login");
  }
};

export default Feed;
