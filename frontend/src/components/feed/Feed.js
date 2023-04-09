import React, { useEffect, useState } from 'react';
import Post from '../post/Post'
import PostForm from '../post/PostForm'

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  useEffect(() => {
    if(token) {
      fetch("/posts", {
        headers: {

          //makes sure a vaild token is present
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(async data => {
          window.localStorage.setItem("token", data.token)
          setToken(window.localStorage.getItem("token"))

          //gets all posts and puts them in reverse order
          setPosts(data.posts.reverse());
        })
    } 
  }, [])

  //adds a new post when form is submitted
  const handlePostSubmit = (message) => {
    fetch('/posts', {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({message})
    })
      .then((response) => response.json())
      .then((data) => {
        
        //sets posts to all posts + the new post 
        setPosts([...posts, data])
        // this refreshes the whole window which is not ideal.
        window.location.reload();
      })
      .catch((error) => console.error(error));
  };
    

  const logout = () => {
    window.localStorage.removeItem("token")
    navigate('/login')
  }
  
    if(token) {
      return(
        // <PostForm.. gets the new post form and calls handlePostSubmit when submitted
        <>
          <h2>Posts</h2>
          <PostForm onSubmit={handlePostSubmit} />
            <button onClick={logout}>
              Logout
            </button>
          <div id='feed' role="feed">
              {
              posts.map(
                (post) => ( 
                <Post post={post} key={ post._id } /> 
                )
              )}
          </div>

        </>
      )
    } else {
      navigate('/login')
    }
}

export default Feed;