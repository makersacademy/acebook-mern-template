import React, { useEffect, useState } from 'react';
import Post from '../post/Post';
import NavBar from '../navbar/NavBar';
import './Feed.css';
import { useNavigate } from 'react-router';
import CreatePostForm from '../createpost/CreatePostForm';

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
        .then(async data => {
          window.localStorage.setItem("token", data.token)
          setToken(window.localStorage.getItem("token"));
          setPosts(data.posts);
        })
    }
  }, [])

  const createpost = () => {
    navigate('/createpost')
  }

  if(token) {
    return (
      <>
      <NavBar navigate={ navigate } />
        <div className="feed-container">
        <CreatePostForm navigate={ navigate } />
        <div id='feed' role="feed">
        {posts?.filter(post => post.message !== "sadasd")
                 .sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated))
                 .map(post => <Post post={post} key={post._id} />)}
        </div>
      </div>
      </>
    )
  } else {
    navigate('/')
  }
}

export default Feed;
