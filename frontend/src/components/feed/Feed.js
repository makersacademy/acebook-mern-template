// Imports necessary dependencies from React and a Post component.
import React, { useEffect, useState } from 'react';
import Post from '../post/Post'

// Define a Feed component which receives a navigate prop to handle navigation.
const Feed = ({ navigate }) => {
  // Initialize states with useState for posts, token and newPost.
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [newPost, setNewPost] = useState('');

  // useEffect hook is used for handling side effects.
  // It fetches posts from the "/posts" endpoint and updates the posts state.
  // The token is included in the header for authorization.
  useEffect(() => {
    if(token) {
      fetch("/posts", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(async data => {
          window.localStorage.setItem("token", data.token)
          setToken(window.localStorage.getItem("token"))
          setPosts(data.posts);
        })
    }
  }, [])

  // const logout = () => {
  //   window.localStorage.removeItem("token")
  //   navigate('/login')
  // }

  // handleSubmit function handles post submission.
  // It sends a POST request to "/posts" endpoint with the new post data.
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch("/posts", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ message: newPost })
      });
  
      const data = await response.json();
  
      setPosts([{ ...data.post, _id: data.post._id}, ...posts]);
      setNewPost('');
  
    } catch (error) {
      console.error(error);
    }
  };

  // handleLike function sends a POST request to "/posts/{postId}/likes" endpoint to like a post.
  // It also updates the post's like count in the local state.
  const handleLike = async (postId) => {
    try {
      const response = await fetch(`/posts/${postId}/likes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
  
      const data = await response.json();
  
      setPosts(posts.map(post => 
        post._id === postId ? { ...post, like: data.post.like } : post
      ));
  
    } catch (error) {
      console.error(error);
    }
  };
  
  // If token is present, render the posts feed with the ability to add a new post and logout.
  // If not, navigate to the signin page.
  if(token) {
    return(
      <>
        <h2>Posts</h2>
        <form onSubmit={handleSubmit}>
          <label>
            New Post:
            <input id="postText" type="text" value={newPost} onChange={(event) => setNewPost(event.target.value)} />
          </label>
          <button id="post" type="submit">Post</button>
        </form>
        <div id='feed' role="feed">
            {posts.map(
              (post) => ( <Post post={ post } key={ post._id } onLike={handleLike} /> )
            )}
        </div>
      </>
    )
    
  } else {
    navigate('/signin')
  }
}


export default Feed;