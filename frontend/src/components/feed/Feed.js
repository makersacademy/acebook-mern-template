import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import PostForm from "../post/PostForm";

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [newPost, setNewPost] = useState("");

  useEffect(() => {
    if (token) {
    if (token) {
      fetch("/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then(async (data) => {
          window.localStorage.setItem("token", data.token);
          setToken(window.localStorage.getItem("token"));
        .then((response) => response.json())
        .then(async (data) => {
          window.localStorage.setItem("token", data.token);
          setToken(window.localStorage.getItem("token"));
          setPosts(data.posts);
        });
    }
  }, []);

  const logout = () => {
    window.localStorage.removeItem("token");
    navigate("/login"); // This is correctly placed
  };

  // const handleNewPostChange = (event) => {
  //   setNewPost(event.target.value);
  // };

  // const createNewPost = async (event) => {
  //   event.preventDefault();

  //   try {
  //     const response = await fetch("/posts", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({ message: newPost }),
  //     });

  //     if (response.status === 201) {
  //       const data = await response.json();
  //       setPosts([data.post, ...posts]);
  //       setNewPost("");
  //     } else {
  //       console.log("Failed to create new post");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  if (token) {
    return (
      <>
        <PostForm token={token} />
        <div>
          <h2>Posts</h2>
          <button onClick={logout}>Logout</button>
          <div id="feed" role="feed">
            {posts.map((post) => (
              <Post post={post} key={post._id} />
            ))}
          </div>
        </div>
      </>
    );
  }
};

export default Feed;
