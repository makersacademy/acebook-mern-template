import React, { useEffect, useState } from 'react';
import Post from '../post/Post';
import AddPost from '../AddPost/AddPost';

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  function orderByDate (posts) {
    return posts.sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt)).reverse()
  }

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
          data.posts.forEach((post) => {
            post.author = post.authorUserID.username
            delete post.authorUserID
          })
          console.log(`1st post's author set to: ${data.posts[0].author}`)
          setPosts(orderByDate(data.posts));
        })
    }
  }, [])
    

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
          <AddPost />
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