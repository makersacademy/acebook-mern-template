import React, { useEffect, useState } from 'react';
import Post from '../post/Post';
import Create from '../createPost/CreatePost';
import Card from '../Helpers/Card'
import './Feed.css';

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem('token'));
  const [postAdded, setPostAdded] = useState(false);

  useEffect(() => {
    if (token) {
      fetch('/posts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then(async (data) => {
          window.localStorage.setItem('token', data.token);
          setToken(window.localStorage.getItem('token'));
          setPosts(data.posts.reverse());
          setPostAdded(false);
        });
    }
    // eslint-disable-next-line
  }, [postAdded]);

  if (token) {
    return (
      
      <div className='feed'>
        <h2>Posts</h2>
        <Create setPostAdded={setPostAdded} />
        <Card>
        <div id="feed" role="feed">
          {posts.map((post) => (
            <Post setPostAdded={setPostAdded} post={post} key={post._id} />
          ))}
        </div>
        </Card>
      </div>
      
    )
  } else {
    navigate('/signin');
  }
};

export default Feed;
