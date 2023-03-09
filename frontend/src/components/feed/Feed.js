import React, { useEffect, useState } from 'react';
import Post from '../post/Post'
import Navbar from '../navbar/Navbar';
import './Feed.css'

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
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetch("/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message: newPost }),
    });
    setPosts([...posts, newPost]);
    setNewPost("");
    navigate(0);
  };

  const logout = () => {
    window.localStorage.removeItem("token");
    navigate("/login");
  };

  if (token) {
    return (
      <>
        <Navbar />
        <h2>Posts</h2>
        <button className="move-right" onClick={logout}>Logout</button>
        <form onSubmit={handleSubmit}>
          <label>
            Add a new post:
            <input
              type="text"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              data-cy="post-input"
            />
          </label>
          <button type="submit" data-cy="form-submit">
            Post
          </button>
        </form>
        <div id="feed" role="feed">
          {[...posts].reverse().map((post) => (
            <Post post={post} key={post._id} />
          ))}
        </div>
      </>
    );
  } else {
    navigate("/signin");
  }
  
    // if(token) {
    //   return(
    //     <>
    //       <h2>Posts</h2>
    //         <button className="move-right" onClick={logout}>
    //           Logout
    //         </button>
    //       <div id='feed' role="feed">
    //           {posts.map(
    //             (post) => ( <Post post={ post } key={ post._id } /> )
    //           )}
    //       </div>
    //     </>
    //   )
    // } else {
    //   navigate('/signin')
    // }
}

export default Feed;
