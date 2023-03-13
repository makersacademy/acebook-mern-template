import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import CreatePost from "../create-post/CreatePost";

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
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
        <h2>Posts</h2>
        {/* <button onClick={logout}>Logout</button> */}
        <CreatePost fetchData={fetchData} />
        <div id="feed" role="feed">
          {[...posts].reverse().map((post) => (
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
