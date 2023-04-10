import React, { useEffect, useState } from 'react';
import Post from '../post/Post';
import axios from 'axios';

const Feed = ({ navigate }) => {
  const [userData, setUserData] = useState({})
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [newPost, setNewPost] = useState("");
  const [newImg, setNewImg] = useState(null);

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
          setPosts(data.posts); 
          setUserData(data.user)
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [token])

  const logout = () => {
    window.localStorage.removeItem("token")
    navigate('/login')
  }

  const new_post = async (event) => {
    if (!newPost) return
    event.preventDefault();
    fetch( '/posts', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({message: newPost})
    })
    .then(response => {
      if(response.status === 201) {
        navigate('/posts');
        window.location.reload(); // should be changed to be more React'ful
      } else {
        throw new Error('Failed to create post');
      }
    })
    .catch(error => {
      console.log(error);
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('img', newImg);

    axios.post('/posts', formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      },
      body: JSON.stringify({message: newPost})
    })
    .then(response => {
      if(response.status === 201) {
        navigate('/posts');
        window.location.reload(); // should be changed to be more React'ful
      } else {
        throw new Error('Failed to create post');
      }
    })
    .catch(error => {
      console.log(error);
    });
  }

  const handleNewPostChange = (event) => {
    setNewPost(event.target.value);
  }

  const handleImg = (event) => {
    setNewImg(event.target.files[0]);
  }

  if(token) {
    return(
      <>
        <h2>Posts</h2>
        <button onClick={logout}>Logout</button>
        <form>
          <input type='text' id='post' value={newPost} onChange={handleNewPostChange} />
          <button onClick={new_post}>Post</button>
        </form>
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
          <input type='file' accept=".png, .jpg, .jpeg" id='img' onChange={handleImg} />
          <input type='submit' />
        </form>
        <div id='feed' role="feed">
          {posts.map((post) => (<Post post={ post } key={ post._id } />))}
        </div>
      </>
    );
  } else {
    navigate('/signin');
    return null;
  }
}

export default Feed;
