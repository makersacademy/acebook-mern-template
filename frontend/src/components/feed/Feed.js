import React, { useEffect, useState } from "react";
import Post from "../post/Post";

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [newPost, setNewPost] = useState("");
  const [newImage, setNewImage] = useState("")
  //TODO: backend req name: imageFile = req.image_file

  // Fetching posts for show on the feed
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

  // adding new post with or without the image
  useEffect(() => {
    fetchData(); // Initial fetch when the component mounts
  }, [token]); // Only fetch data when token changes

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    
    let newPostId = ""

    if (!newPost.trim()) {
      console.error("You cannot create an empty post");
      return;
    }
    try {
      const response = await fetch("/posts", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ message: newPost }),
      });
  
      if (response.ok) {
        // If post creation is successful, proceed to file upload
        const data = await response.json();
        newPostId = data.post_id
        window.localStorage.setItem("token", data.token);
        setToken(window.localStorage.getItem("token"));
        setPosts(data.posts);
      } else {
        console.error("Error creating post");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    // THEN IMAGE
    if (newImage !== "") {

      const imageData = new FormData();
      imageData.append('file', newImage); // req.file in the backend
  
      // File upload
      const response2 = await fetch("/upload", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: imageData,
      });
      if (response2.ok) {
        const filename = await response2.text();
        console.log("IS RESPONSE A FILENAME? : ", filename)
        setNewImage(null); // reset form

        //TODO: change filename in database
        const response3 = await fetch("posts/image", {
          method: "POST",
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ filename: filename, post_id: newPostId }),
        });

        if(response3.ok) {
          console.log("FILENAME SENT TO BACKEND, DATA SENT: ", filename, newPostId)
        }
        else {
          console.log("ERROR WHILE LOADING FILENAME")
        }
  
      }
      else if (!response2.ok) {
        console.error("Error uploading file");
      }
    }
    else {
      console.log("Post without image");
    }
  };
  

  if (token) {
    return (
      <>
        <h2>Posts</h2>

        {/* add-post component start */}

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
            accept=".jpg, .jpeg, .png, .gif"  // only specific filetypes accepted
            // value={ newImage }
            onChange={(e) => setNewImage(e.target.files[0])}
            />
          </div>
          <button type="submit">Create Post</button>
        </form>

        {/* add-post component finish */}

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
