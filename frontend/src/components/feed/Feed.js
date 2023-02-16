import React, { useEffect, useState } from 'react';
import CreatePostForm from '../createPostForm/createPostForm';
import Post from '../post/Post';

const Feed = ({ navigate, path, setReload, reload }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem('token'));
  const [id, setId] = useState(window.localStorage.getItem('user_id'));

  useEffect(() => {
    if (token) {
      fetch(
        path
          ? `${process.env.REACT_APP_API_URL}/${path}`
          : `${process.env.REACT_APP_API_URL}/posts`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => response.json())
        .then(async (data) => {
          window.localStorage.setItem('token', data.token);
          setToken(window.localStorage.getItem('token'));
          setId(window.localStorage.getItem('user_id'));
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
        <button id='logout-button' onClick={logout}>
          Logout
        </button>

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
