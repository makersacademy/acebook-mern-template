import React, { useEffect, useState } from 'react';
import Post from '../post/Post'

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [newPost, setNewPost] = useState("");

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


  const logout = () => {
    window.localStorage.removeItem("token")
    navigate('/login')
  }

  const submitPost = (event) => {
    event.preventDefault() // don't do the default functionality of the form - which would submit and reload the page
    console.log(newPost) // connect to database, update data
    setNewPost(""); // clear the input field - set as empty string so type doesn't change
  }

  const onChangePostInput = (event) => {
    setNewPost(event.target.value)
  }

  if(token) {
    return(
      <>
        <h2>Posts</h2>
          <button onClick={logout}>
            Logout
          </button>
        <form onSubmit={submitPost}>
          <input onChange={onChangePostInput} type="text" value={newPost} />
          <button type="submit">Submit</button>
        </form>
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
}

export default Feed;
