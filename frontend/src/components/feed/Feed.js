import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import CreatePost from "../createPost/CreatePost";
import '../../index.css'
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
      <>
        <h2 style={{ textAlign: "center", color: "#166fe5" }}>Posts</h2>
        <div id="new-post">
          <CreatePost handleRefresh={handleRefresh} />
        </div>
        <div id="feed" role="feed" className="posts">
          {posts.map((post) => (
            <>
            <Post 
            post={post}
            key={post._id}
            />
            {/* <CreateLike handleRefresh={handleRefresh}/> */}
            </>
              
          ))}
        </div>
        <button onClick={logout}>Logout</button>
      </>
    );
  } else {
    navigate("/login");
    return null;
  }
};

export default Feed;
