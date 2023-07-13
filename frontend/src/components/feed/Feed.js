import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import CreatePost from "../createPost/CreatePost";
import "./Feed.css";
import CreateLike from "../createLike/CreateLike";

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [refreshFeed, setRefreshFeed] = useState(false); // State variable to track refresh action

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
          setRefreshFeed(false);
        });
    }
  }, [refreshFeed]);

  const logout = () => {
    window.localStorage.removeItem("token");
    navigate("/login");
  };

  const handleRefresh = () => {
    setRefreshFeed(true); // Trigger the refresh action
  };

  if (token) {
    return (
      <div className="feed-wrapper">
        <div role="feed" className="feed-posts">
          <div className="new-post">
            <CreatePost handleRefresh={handleRefresh} />
          </div>
          {posts.map((post) => (
            <Post post={post} key={post._id} handleRefresh={handleRefresh} />
          ))}
        </div>
      </div>
    );
  } else {
    navigate("/login");
    return null;
  }
};

export default Feed;
