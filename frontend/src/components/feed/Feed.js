import React, { useEffect, useState } from 'react';
import Post from '../post/Post';
import { fetchPosts, handleSendingNewPost } from '../../fetchers';

const Feed = ({ navigate }) => {
  const [message, setMessage] = useState('');
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  useEffect(() => {
    fetchPosts(token, setToken, setPosts);
  }, [])
    
  const logout = () => {
    window.localStorage.removeItem("token")
    navigate('/login')
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleSendingNewPost(token, message, "/posts");
    fetchPosts(token, setToken, setPosts);
    setMessage('');
  }

    if(token) {
      return(
        <>
            <h1>Posts</h1>
            <h2>What's up?</h2>
            <form onSubmit={handleSubmit}>
              <textarea 
                id='message'
                value={message}
                onChange={(event) => setMessage(event.target.value)} 
                type='text' 
                placeholder='Your feelings matter.' 
                required>
              </textarea>
              <button id='submit'>Post</button>
            </form>

            <div id='feed' role="feed">
              {posts.map(
                // index is counting the times i map
                (post, index) => ( <Post post={ post } key={ post._id + index } /> )
              ).reverse()}
            </div>
            
            <button onClick={logout}>
              Logout
            </button>
        </>
      )
    } else {
      navigate('/signin')
    }
}

export default Feed;