import React, { useEffect, useState } from 'react';
import Post from '../post/Post';
import PostForm from '../postForm/PostForm';
import CommentForm from '../postCommentForm/CommentForm';
import LikeButton from '../likeButton/LikeButton';

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem('token'));

  const reload = () => {
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
          setPosts(data.posts);
        });
    }
  }

  useEffect(() => {
    reload()
  }, []);

  const logout = () => {
    window.localStorage.removeItem('token');
    navigate('/login');
  };

  if (token) {
    return (
      <>
        <div id="header_wrapper">
          <div id="header">
            <li id="sitename">
              <a href="/signup">Acebook</a>
            </li>
            <button onClick={logout}>Logout <i className="fa-solid fa-right-from-bracket"></i></button>
          </div>
        </div>
        <div id="wrapper">
          <h2>Feed</h2>
          <PostForm reload={ reload }/>
          <div id="feed" role="feed">
            <PostForm />
            <br></br>
            {posts.map((post) => (
              <div class='post-card-container'>
                <Post post={post} key={post._id} />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  } else {
    navigate('/signin');
  }
};

export default Feed;
