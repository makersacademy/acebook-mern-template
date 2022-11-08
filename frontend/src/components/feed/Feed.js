import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import "./Feed.css";
import CreatePost from "../createPost/CreatePost";

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
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
  };

  const logout = () => {
    window.localStorage.removeItem("token");
    navigate("/login");
  };

  if (token) {
    return (
      <>
        <div id="post-body">
          <h2 id="posts-heading">Posts</h2>
          <button id="logout-button" onClick={logout}>
            Just leave.
          </button>
          <div id="message-box">
            <CreatePost fetchPosts={fetchPosts} navigate={navigate} />
          </div>
          <div id="feed" role="feed">
            {posts.map((post) => <Post post={post} key={post._id} />).reverse()}
          </div>
        </div>
      </>
    );
  } else {
    navigate("/login");
  }
};

export default Feed;
