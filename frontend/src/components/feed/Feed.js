import React, { useEffect, useState, useContext } from "react";
import Post from "../post/Post";
import NewPost from "../newPost/NewPost";
import { AuthContext } from "../../contexts/AuthContext";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const { token, setToken } = useContext(AuthContext);

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
      <h2>Posts</h2>

      <NewPost getPosts={getPosts} />

      <div id="feed" className="flex flex-col gap-4" role="feed">
        {posts.map((post) => (
          <Post post={post} key={post._id} />
        ))}
      </div>
    </>
  );
};

export default Feed;
