import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import CreatePost from "../createPost/CreatePost";
import '../../index.css'

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
          setRefreshFeed(false)
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

  // const handleLike = (postId) => { 
  // }; connect with backend
  // const handleUnlike = (postId) => {
  // }; connect with backend

  if (token) {
    return (
      <div className="wrapper">
        <div className="new-post">
          <CreatePost handleRefresh={handleRefresh} />
        </div>
        <div className="feed">
          <h2 className="feed-heading">Posts</h2>
          <div className="posts">
            {posts.map((post) => (
              <Post
                post={post}
                key={post._id}
                // onLike={handleLike}
                // onUnlike={handleUnlike}
              />
            ))}
          </div>
        </div>
        <div className="right-side">
          {/* Add your search component here */}
        </div>
        {/* <button onClick={logout}>Logout</button> */}
      </div>
    );
  } else {
    navigate("/login");
    return null;
  }
};

export default Feed;
