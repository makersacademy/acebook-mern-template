import React, { useEffect, useState } from 'react';
import Post from '../post/Post';
import AddPost from '../AddPost/AddPost';
import "./Feed.css";

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  window.localStorage.setItem("app-route", "feed")

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
            post.avatar = post.authorUserID.avatar
            delete post.authorUserID
          })
          console.log(`1st post's author set to: ${data.posts[0].author}`)
          setPosts(orderByDate(data.posts));
        })
    }
  }, [])
  
  if(token) {
    return(
      <>
        <div className="add-posts">
          <AddPost />
        </div>
        
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