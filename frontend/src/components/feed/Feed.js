import React, { useEffect, useState } from 'react';
import Post from '../post/Post'
import NewPostForm from '../new-post/NewPostForm'

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));


  useEffect(() => {
    if(token) {
      fetch("/posts", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(async data => { // try to remove async and see if it works
          window.localStorage.setItem("token", data.token)
          setToken(window.localStorage.getItem("token"))
          setPosts(data.posts);
        })
    }
  }, []) // don't retrigger on every re-render - just when submit button is clicked?


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

        <div className="new-post-form">
          < NewPostForm/>
        </div>


        <div id='feed' role="feed">
            {posts.map(
              (post) => ( <Post post={ post } key={ post._id }/> )
            )}
        </div>
      </>
    )
  } else {
    navigate('/signin')
  }
}

export default Feed;
