import React, { useEffect, useState } from 'react';
import CreatePostForm from '../createPostForm/createPostForm';

import Post from '../post/Post';

const Feed = ({ navigate, path }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem('token'));
  const [id, setId] = useState(window.localStorage.getItem('user_id'));
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (token) {
      fetch(path || '/posts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then(async (data) => {
          window.localStorage.setItem('token', data.token);
          setToken(window.localStorage.getItem('token'));
          setId(window.localStorage.getItem('user_id'));
          console.log('i just fetched the data');
          setPosts(data.posts);
          setReload(false);
        });
    } else {
      navigate('/login');
    }
  }, [reload]);

  const logout = () => {
    window.localStorage.removeItem('token');
    navigate('/login');
  };

  if (token) {
    return (
      <>
        <h2>Posts</h2>
        <button onClick={logout}>Logout</button>
        <CreatePostForm
          navigate={navigate}
          token={token}
          id={id}
          setReload={setReload}
        />
        <div id='feed' role='feed'>
          {posts ? (
            posts
              .slice(0)
              .reverse()
              .map((post) => (
                <Post post={post} key={post._id} setReload={setReload} />
              ))
          ) : (
            <p>loading</p>
          )}
        </div>
      </>
    );
  }
};
export default Feed;
