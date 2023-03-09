import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Post from "../post/Post";
import Button from "../button/Button";

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
          window.localStorage.setItem("token", data.token);
          setToken(window.localStorage.getItem("token"));
          setPosts(data.posts);
        });
    }
  }, []);

  const logout = () => {
    window.localStorage.removeItem("token");
    navigate("/login");
  };

  if (token) {
    return (
      <>
        <h2>Posts</h2>
        <Button
          text="Logout"
          clickCallback={logout}
          type="button"
          id="logout"
          className="max-w-sm"
        />
        <div id="feed" role="feed">
          {posts.map((post) => (
            <Post post={post} key={post._id} />
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
