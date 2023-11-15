import React, { useEffect, useState } from 'react';
import Post from '../post/Post'

// Feed Page
const Feed = ({ navigate }) => {

  // =========== STATE VARIABLES =========================
  const [posts, setPosts] = useState([]); //all posts
  const [token, setToken] = useState(window.localStorage.getItem("token")); //similar to session id


  // =========== GET ALL POSTS WHEN THE COMPONENT MOUNTS =========================
  useEffect(() => {
    // Checking if token exists (aka user is logged in)
    if(token) {
      // Sends GET request to '/posts' with the auth token
      fetch("/posts", {
        headers: {
          'Authorization': `Bearer ${token}` // <======= BODY OF REQUEST
                                            //Use for all GET requests that require login
        }
      })
        .then(response => response.json())
        .then(async data => {
          // Updates to a new token when the GET request is complete
          window.localStorage.setItem("token", data.token)
          setToken(window.localStorage.getItem("token"))

          // Updates posts with all posts retrieved
          // setPosts(data.posts); <=== change to below for posts sorted by date_posted in reverse order.

          // Sort posts based on date_posted in descending order
          const sortedPosts = data.posts.sort((a, b) => new Date(b.date_posted) - new Date(a.date_posted));
          setPosts(sortedPosts);
        })
    }
  }, [])
  

  // =========== FUNCTION TO HANDLE USER LOGOUT: =========================
  // TODO: Refactor into LogOut component to reuse on all login-required pages.
  const logout = () => {
    window.localStorage.removeItem("token")
    navigate('/login')
  }

  
  
  
  // ========================= JSX FOR THE UI OF THE COMPONENT =================================
    // currently shows 'Posts' header, a logout button and a feed of posts
    // see ../post/Post for formatting

  if(token) { // if user is logged in
    return(
      <>
        <h2>Posts</h2>
          <button onClick={logout}>
            Logout
          </button>
        <div id='feed' role="feed">
            {posts.map(
              (post) => ( <Post post={ post } key={ post._id } /> ) // <======= 
            )}
        </div>
      </>
    )
  } else { // else re-direct to '/login'
    navigate('/login')
  }
}





export default Feed;
