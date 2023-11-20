import React, { useEffect, useState } from "react";
import Post from "../post/Post";

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [newPost, setNewPost] = useState("");

  // Declare fetchData function
  const fetchData = async () => {
    if (token) {
      try {
        const response = await fetch("/posts", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          window.localStorage.setItem("token", data.token);
          setToken(window.localStorage.getItem("token"));
          setPosts(data.posts);
        } else {
          console.error("Error fetching posts");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
  };

  useEffect(() => {
    fetchData(); // Initial fetch when the component mounts
  }, [token]); // Only fetch data when token changes

  const logout = () => {
    window.localStorage.removeItem("token");
    navigate('/login');
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    if (!newPost.trim()) {
      console.error("You cannot create an empty post");
      return;
    }

    const response = await fetch("/posts", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ message: newPost }),
    });

    if (response.ok) {
      const data = await response.json();
      window.localStorage.setItem("token", data.token);
      setToken(window.localStorage.getItem("token"));
      setPosts(data.posts);
      setNewPost("");
      fetchData(); // Fetch data after updating the state
    } else {
      console.error("Error creating post");
    }
  };

  if (token) {
    return (
      <>
        <h2>Posts</h2>
        <button onClick={logout}>Logout</button>

        <form onSubmit={handlePostSubmit} data-cy="post-form">
          <label>
            New Post:
            <input
              type="text"
              name="newPost"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              data-cy="new-post-input"
            />
          </label>
          <button type="submit">Create Post</button>
        </form>

        <div id='feed' role="feed">
          {Array.isArray(posts) && posts.length > 0 ? (
            posts.map((post) => (
              <Post post={post} key={post._id} />
            ))
          ) : (
            <p data-cy="no-posts-message">No posts yet :( </p>
          )}
        </div>
      </>
    );
  } else {
    navigate('/login');
  }
};

export default Feed;
