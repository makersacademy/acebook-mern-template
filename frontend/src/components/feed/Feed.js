import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import "./Feed.css";
import CreatePost from "../CreatePost/CreatePost";
// import Dropdown from "react-dropdown";

const Feed = ({ navigate, filter }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [updated, setUpdated] = useState(false);
  // const options = [
  //   'Newest to Oldest', 'Oldest to Newest', 'Friends Only Mode'
  // ];
  // const defaultOption = options[0];

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
    }
  }, [updated]);

  if (token) {
    return (
      <>
        <CreatePost setUpdated={setUpdated} />
        <h2>Posts</h2>
        {/* <Dropdown options={options} onChange={setUpdated} value={defaultOption} placeholder="Choose" /> */}
        <div id="feed" role="feed">
          <div id="feed" role="feed">
            {filter
              ? posts
                  .filter((post) => post.author._id === filter)
                  .map((post) => (
                    <Post post={post} key={post._id} setUpdated={setUpdated} />
                  ))
              : posts.map((post) => (
                  <Post post={post} key={post._id} setUpdated={setUpdated} />
                ))}
          </div>
        </div>
      </>
    );
  } else {
    navigate("/signin");
  }
};

export default Feed;
