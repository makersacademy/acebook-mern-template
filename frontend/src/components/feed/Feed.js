import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import "./Feed.css";
import CreatePost from "../CreatePost/CreatePost";

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [updated, setUpdated] = useState(false);

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
          setUpdated(false);
        });
    } else {
    navigate("/login");
    }
  }, [updated]);

  if (token) {
    return (
      <>
        <CreatePost setUpdated={setUpdated} />
        <h2>Posts</h2>
        <div id="feed" role="feed">
          {posts.map((post) => (
            <Post post={post} key={post._id} />
          ))}
        </div>
      </>
    );
  };
};

export default Feed;