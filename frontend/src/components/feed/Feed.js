import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import PostForm from "../post/PostForm";

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        const response = await fetch("/posts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log(data);
        window.localStorage.setItem("token", data.token);
        setToken(window.localStorage.getItem("token"));
        setPosts(data.posts);
      }
    };

    fetchData();
  }, [token, navigate]);

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
