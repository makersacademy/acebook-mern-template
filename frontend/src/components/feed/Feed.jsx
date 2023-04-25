import React, { useEffect, useState } from 'react';
import Post from '../post/Post'
import Button from '../button/Button'

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  useEffect(() => {
    if(token) {
      fetch("/api/posts", {
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
  
    if(token) {
      return(
        <>
          <h2>Hi Jay, What's on your mind?</h2>
          <Button navigate={navigate} routePath={'/posts/new'} text={'Post Something'}/>

          <div id='feed' role="feed">
              {posts.map(
                (post) => ( <Post post={ post } key={ post._id } token={token} setToken={setToken}/> )
              )}
          </div>
        </>
      )
    } else {
      navigate('/signin')
    }
}

export default Feed;