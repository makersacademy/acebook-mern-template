import React, { useEffect, useState } from "react";
import Post from "../post/Post";

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [newPost, setNewPost] = useState("");

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
    } else {
      navigate("/login"); // Moved to useEffect
    }
  }, [token, navigate]); // Added token and navigate as dependencies

  const logout = () => {
    window.localStorage.removeItem("token");
    navigate("/login"); // This is correctly placed
  };

  const handleNewPostChange = (event) => {
    setNewPost(event.target.value);
  };

  const createNewPost = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: newPost }),
      });

      if (response.status === 201) {
        const data = await response.json();
        setPosts([data.post, ...posts]);
        setNewPost("");
      } else {
        console.log("Failed to create new post");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (token) {
    return (
      <>
        <h2>Create New Post</h2>
        <form onSubmit={createNewPost}>
          <input
            type="text"
            placeholder="Enter your post"
            value={newPost}
            onChange={handleNewPostChange}
          />
          <button type="submit">Post</button>
        </form>

        <h2>Posts</h2>
        <button onClick={logout}>Logout</button>
        <div id="feed" role="feed">
          {posts.map((post) => (
            <Post post={post} key={post._id} />
          ))}
        </div>
      </>
    );
  }
  // Removed the navigate('/login') call here as it's now handled in the useEffect
};

export default Feed;
