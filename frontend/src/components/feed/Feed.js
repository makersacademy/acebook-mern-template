import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import PostForm from "../post/PostForm";

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
          console.log(data);
          window.localStorage.setItem("token", data.token);
          setToken(window.localStorage.getItem("token"));
          setPosts(data.posts);
        });
    }
  }, [token, navigate]);

  const logout = () => {
    window.localStorage.removeItem("token");
    navigate("/login"); // This is correctly placed
  };

  const handleNewPost = (post) => {
    setPosts((prevPosts) => {
      const newPosts = [...prevPosts, post];
      const reversedPosts = newPosts.reverse();
      return reversedPosts;
    });
  };

  if (token) {
    return (
      <>
        <PostForm token={token} onNewPost={handleNewPost} />
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
  } else {
    return (
      <>
        <div>
          <h2>Posts</h2>
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
