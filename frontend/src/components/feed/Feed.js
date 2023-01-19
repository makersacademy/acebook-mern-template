import React, { useEffect, useState } from 'react';
import Post from '../post/Post';
import Create from '../createPost/CreatePost';
import Card from '../Helpers/Card';
import './Feed.css';

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem('token'));
  const [postAdded, setPostAdded] = useState(false);
  const userId = window.localStorage.getItem('user_id');

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
          console.log(data.posts);
        });
    }
    // eslint-disable-next-line
  }, [postAdded]);

  if (token && window.location.pathname === `/users/${userId}`) {
    return (
      <div className="feed">
        <h2>Posts</h2>

        <Card>
          <div id="feed" role="feed">
            {posts
              .filter((post) => post.user_id._id === userId)
              .map((post) => (
                <Post post={post} key={post._id} setPostAdded={setPostAdded} />
              ))}
          </div>
        </Card>
      </div>
    );
  } else if (token) {
    return (
      <div className="feed">
        <h2>Posts</h2>
        <Create setPostAdded={setPostAdded} />

        <Card>
          <div id="feed" role="feed">
            {posts.map((post) => (
              <Post post={post} key={post._id} setPostAdded={setPostAdded} />
            ))}
          </div>
        </Card>

      </div>
    );
  } else {
    navigate('/signin');
  }
};

export default Feed;
