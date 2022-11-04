import React, { useEffect, useState } from 'react';
import Post from '../post/Post';
import './Feed.css';

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem('token'));
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
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
  };

  const handleSubmitPost = async (event) => {
    event.preventDefault();

    if (message === '') return;
    if (!message.match(/^[a-zA-Z0-9~!@#()`;\-':,.?| ]*$/)) return;

    let response = await fetch('/posts', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message: message }),
    });
    console.log('submit');

    if (response.status !== 201) {
      navigate('/posts');
    } else {
      let data = await response.json();
      window.localStorage.setItem('token', data.token);
      fetchPosts();
      setMessage('');
    }
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const logout = () => {
    window.localStorage.removeItem('token');
    navigate('/login');
  };

  if (token) {
    return (
      <>
        <div id="post-body">
          <h2 id="posts-heading">Posts</h2>
          <button id="logout-button" onClick={logout}>
            Just leave.
          </button>
          <div id="message-box">
            <form onSubmit={handleSubmitPost}>
              <label id="post-a-message-label">
                Spew some shit that no one cares about:
              </label>
              <textarea
                placeholder="Message"
                id="message"
                value={message}
                onChange={handleMessageChange}
              />
              <div id="message-button-container">
                <input
                  className="message-button"
                  id="submit"
                  type="submit"
                  value=":@"
                />
                <div id="image-buttons">
                  <button className="message-button" id="choose-file-button">
                    Choose file of your ugly child
                  </button>
                  <button className="message-button" id="upload-file-button">
                    Upload photo of your food no one cares about
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div id="feed" role="feed">
            {posts.map((post) => <Post post={post} key={post._id} />).reverse()}
          </div>
        </div>
      </>
    );
  } else {
    navigate('/login');
  }
};

export default Feed;
