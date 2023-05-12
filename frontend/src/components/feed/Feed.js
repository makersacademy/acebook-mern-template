import React, { useEffect, useState, useContext } from 'react';
import Post from '../post/Post'
import CreatePostForm from '../createPost/CreatePostForm';


const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [needsRefresh, setRefresh] = useState(false);
  const [token, setToken] = useState(window.localStorage.getItem("token"));


  useEffect(() => {
    if (token) {
      fetch("/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => response.json())
        .then(async data => {
          window.localStorage.setItem("token", data.token)
          setToken(window.localStorage.getItem("token"))
          setPosts(data.posts)
          setRefresh(false);
        })
    }
  }, [needsRefresh]) //Dependency - when needsRefresh (a boolean)
    // changes, it call for the useEffect to be rerun - refreshing the posts
    // pass () => setRefresh(true) to any component that needs to refresh and call it in the component

  const logout = () => {
    window.localStorage.removeItem("token")
    navigate('/login')
  }
  
    if(token) {
      return(
        <>
          <h2>Posts</h2>
            <button onClick={logout}>
              Logout
            </button>
            <CreatePostForm onCreated={() => setRefresh(true)}/> 
          <div id='feed' role="feed">
              {posts.map(
                (post) => ( <Post post={ post } key={ post._id } /> )
              )}
          </div>
        </>
      )
    } else {
      navigate('/signin')
    }
};

export default Feed;
