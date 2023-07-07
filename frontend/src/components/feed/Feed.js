import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import CreatePost from "../createPost/CreatePost";

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
  }, [refreshFeed]); // check array and how this works. 

  const logout = () => {
    window.localStorage.removeItem("token");
    navigate("/login");
  };

 // code here to refresh feed  
   const handleRefresh = () => {
    setRefreshFeed(true); // Trigger the refresh action
  };
//


  if (token) {
    return (
      <>
        <h2>Posts</h2>
        <button onClick={handleRefresh}>Update Feed</button> 
        <button onClick={logout}>Logout</button>
        <div id="new-post">
          <CreatePost />
        </div>
        <div id="feed" role="feed">
          {posts.map((post) => (
            <Post post={post} key={post._id} />
          ))}
        </div>
        <div></div>
      </>
    );
  } else {
    navigate("/login");
  }
};

export default Feed;
