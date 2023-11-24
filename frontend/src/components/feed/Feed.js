import React, { useEffect, useState } from 'react';
import Post from '../post/Post'
import NewPost from '../post/NewPost';
import NewComment from '../comment/NewComment';

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [currentUserId, setCurrentUserId] = useState(
    window.localStorage.getItem("currentUserID")
  );
  const [reRender, setReRender] = useState(false);
  const [userId, setUserId] = useState();

  const fetchPosts = () => {
    fetch("/api/posts/following", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(async data => {
        window.localStorage.setItem("token", data.token)
        setToken(window.localStorage.getItem("token"))
        setPosts(data.posts.reverse());
        setReRender(false)
      })
  }
  useEffect(() => {
    if(token && currentUserId) {
      fetch("/api/posts/following", {
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
      navigate('/login')
    }
  }, [userId, posts, reRender])
  

  

  const updateComments = (postId, newComments) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId ? { ...post, comments: newComments } : post
      )
    );
  };
  
  console.log(posts)
    if(token && posts) {
      return(
        <>
          <NewPost posts={posts} setPosts={setPosts} setReRender={ setReRender }/>
          <h1>Posts</h1>
          <div id='feed' role="feed" className='flex-centre'>
              {posts.reverse().map(
                (post) => ( <Post post={ post } key={ post._id } fetchPosts={ fetchPosts} userId={userId}/> )
              )}
          </div>
        </>
      )
    } else {
      navigate('/login')
    }
}

export default Feed;
