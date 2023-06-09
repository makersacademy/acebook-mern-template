import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import PostCreateForm from "../post/PostCreateForm";
import BarLoader from 'react-spinners/BarLoader';

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token")); // Retrieves a token from the browser storage

  useEffect(() => {
    // Will send a fetch request if a valid token is found
    if (token) {
      fetch("/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        // This .json() turns a json response into a JS object
        .then(response => response.json())
        .then(data => {
          if (data.posts) {
            window.localStorage.setItem("token", data.token);
            setToken(window.localStorage.getItem("token"));
            setPosts(data.posts);
          } else {
            // navigate to login if token but not valid (timed-out)
            navigate("/login");
          }
        });
    } else {
      // navigate to login if no token
      navigate("/login");
    }
  }, [navigate, token]);

  const logout = () => {
    window.localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
    {posts.length > 0 ? (<>
      <h2>Posts</h2>
      <button onClick={logout}>Logout</button>
      <PostCreateForm />
      <div id="feed" role="feed">
        {posts.map(post => (
          <Post post={post} key={post._id} />
        ))}
      </div>
       </>) : (<BarLoader color='#1877f2'/>)}
      
      
    </>
  );
};

export default Feed;
