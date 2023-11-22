import React, { useEffect, useState } from "react";
import Post from "../post/Post";

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [newPost, setNewPost] = useState("");
  const [newImage, setNewImage] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  // Fetching posts to show on the feed
  const fetchData = async () => {
    if (token) {
      const GetPostsResponse = await fetch("/posts", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (GetPostsResponse.ok) {
        const postsData = await GetPostsResponse.json();
        window.localStorage.setItem("token", postsData.token);
        setToken(window.localStorage.getItem("token"));
        setPosts(postsData.posts);
      } else {
        console.error("Error fetching posts");
      }
    }};

  // Adding new post with or without the image
  useEffect(() => { fetchData() }, [token]);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // loading state while feed is fetching

    let newPostId = "";
    let newPostImage = null;

    // POST REQUEST -> /POSTS : SEND POST MESSAGE
    // RESPONSE => new post id
    if (!newPost.trim()) {
      alert("You cannot create an empty post");
      return setLoading(false)
    }
    try {
      const PostPostResponse = await fetch("/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: newPost }),
      });

      // If post creation is successful, proceed to file upload
      if (PostPostResponse.ok) {
        const data = await PostPostResponse.json();
        newPostId = data.post_id;
        window.localStorage.setItem("token", data.token);
        setToken(window.localStorage.getItem("token"));
        setPosts(data.posts);

        // if newImage uploaded
        // POST REQUEST -> /UPLAD : SEND POST IMAGE & POST_ID if present
        // RESPONSE -> new generated unique filename
        if (newImage) {
          newPostImage = new FormData();
          newPostImage.append("file", newImage); // req.file in the backend
          newPostImage.append("post_id", newPostId); // req.file in the backend

          const PostImageResponse = await fetch("/upload", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: newPostImage,
          });

          // refresh and fetch all data 
          if (PostImageResponse.ok) {
            fetchData();
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); // Set loading to false after the requests are completed
    }
  };

  if (token) {
    return (
      <>
        <h2>Posts</h2>

        {/* add-post component start */}

        {loading ? (
          <p>Loading...</p> // Display a loading message or spinner while loading
        ) : (
          <form onSubmit={handlePostSubmit} data-cy="post-form">
            <div>
              <label htmlFor="newPost">New Post:</label>
              <input
                type="text"
                name="newPost"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                data-cy="new-post-input"
              />
            </div>

            {/* user can add image to their post */}
            <div>
              <label htmlFor="file"></label>
              <input
                type="file"
                name="file"
                accept=".jpg, .jpeg, .png, .gif" // only specific filetypes accepted
                onChange={(e) => setNewImage(e.target.files[0])}
                data-cy="file-input"
              />
            </div>
            <button type="submit">Create Post</button>
          </form>
        )}

        {/* add-post component finish */}

        <div id="feed" role="feed">
          {Array.isArray(posts) && posts.length > 0 ? (
            posts.map((post) => <Post post={post} key={post._id} />)
          ) : (
            <p data-cy="no-posts-message">No posts yet :( </p>
          )}
        </div>
      </>
    );
  } else {
    navigate("/login");
  }
};

export default Feed;
