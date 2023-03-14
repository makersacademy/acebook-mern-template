import React, { useEffect, useState, useContext } from "react";
import Post from "../post/Post";
import NewPost from "../newPost/NewPost";
import { TokenContext } from "../../contexts/tokenContext";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const { token, setToken } = useContext(TokenContext);

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
};

export default Feed;
