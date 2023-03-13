import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Post from "../post/Post";
import NewPost from "../newPost/NewPost";

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const getPosts = async () => {
    if (token) {
      const response = await fetch("/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        // error
      } else {
        const data = await response.json();
        window.localStorage.setItem("token", data.token);
        setToken(data.token);
        setPosts(data.posts);
      }
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  if (token) {
    return (
      <>
        <NewPost getPosts={getPosts} />

        <div id="feed" role="feed">
          {posts.map((post) => (
            <Post post={post} key={post.id} />
          ))}
        </div>
      </>
    );
  }
  navigate("/signin");
  return <span />;
};

Feed.propTypes = {
  navigate: PropTypes.func.isRequired,
};

export default Feed;
