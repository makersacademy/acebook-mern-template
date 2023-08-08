import React, { useEffect, useState } from "react";
import Post from "../post/Post";

const Feed = ({ navigate, searchQuery }) => {
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

  useEffect(() => {
    console.log("posts got updated; ", posts);
  }, [posts]);

  const logout = () => {
    window.localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <h2>Posts</h2>
      <button onClick={logout}>Logout</button>
      <div id="feed" role="feed"></div>
      {typeof searchQuery !== "undefined"
        ? searchQuery.posts.map((post) => <Post post={post} key={post._id} />)
        : posts.map((post) => <Post post={post} key={post._id} />)}
      {/* <div id="feed" role="feed">
        {posts.map((post) => (
          <Post post={post} key={post._id} />
        ))}
      </div> */}
    </>
  );
};

export default Feed;

// let searchResults = [];
// for (let i = 0; i < posts.length; i++) {
//   if (posts.includes(searchQuery)) {
//     searchResults.push(posts);
//   }
// }
// {searchResults.map((post) => (
//   <Post post={post} key={post._id} />
// ))}
