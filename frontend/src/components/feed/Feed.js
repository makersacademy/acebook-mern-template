import React, { useEffect, useState } from 'react';
import Post from '../post/Post'

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [userId, setUserId] = useState();

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
          setUserId(data.userID)
        })
    }
    else {
      navigate('/login')}
  }, [userId, posts])
    if(token && posts) {
      return(
        <>
          <h1>Posts</h1>
          <div id='feed' role="feed" className='flex-centre'>
              {posts.map(
                (post) => ( <Post post={ post } key={ post._id } userId={userId}/> )
              )}
          </div>
        </>
      )
    } else {
      navigate('/login')
    }
}

export default Feed;
