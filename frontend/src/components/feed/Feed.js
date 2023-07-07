import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import CreatePost from "../createPost/CreatePost";
import '../../index.css'

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

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
  }, []);

  const logout = () => {
    window.localStorage.removeItem("token");
    navigate("/login");
  };

  if (token) {
    return (
      <>
        <h1>Posts</h1>
        <button onClick={logout}>Logout</button>
        <div id="new-post">
          <CreatePost />
        </div>
        <div id="feed" role="feed" className="posts">
          {posts.map((post) => (
            <Post post={post} key={post._id} />
          ))}
        </div>
      </>
    );
  } else {
    navigate("/login");
  }
};

export default Feed;
