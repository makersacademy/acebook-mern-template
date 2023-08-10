
import React, { useEffect, useState } from 'react';
import Post from '../post/Post';
import './Feed.css'
import { useNavigate } from 'react-router-dom';
  
const Feed = ({ navigate, searchQuery, setSearchQuery }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  
  const handleMessageChange = (event) => {
    setMessage(event.target.value)
  }
  const [errorMessage, setErrorMessage] = useState("");

  
  useEffect(() => {
    if (token) {
      fetch("/posts", {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

        .then(response => {
          if (response.status === 401) {
            navigate('/login');
            return;
          }
          return response.json();
        })
        .then(async data => {
          if (!data) return;
          window.localStorage.setItem("token", data.token)
          setToken(window.localStorage.getItem("token"))
          setPosts(data.posts);
        });
    }
  }, [token, navigate])


  const logout = () => {
    window.localStorage.removeItem("token")
    window.localStorage.removeItem("username")
    navigate('/login')
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch( '/posts', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ message: message })
    })
      .then(async response => {
        if(response.status === 201) {
          let data = await response.json()
          let newPosts = [...posts, { likes: [], message: message, _id: data.postId, user: data.user, }]
          setPosts(newPosts)
          setSearchQuery(newPosts);
          setMessage("")
        } else {
          setErrorMessage('Invalid message!');
          navigate('/posts')
        }
      })
  }
  
    if(token) {
      return(
        <>
        <h1 class='acebook'><img src="https://i.ibb.co/1Rsnzft/s-l1200.jpg" alt="s-l1200" width="70px" height="100px" border='3px solid'/>cebook</h1>
          <button onClick={logout}>
            Logout
          </button>
          <h2 class='formheader'>Posts</h2>
          <form onSubmit={handleSubmit}>
            <input 
              placeholder="Make a post..." 
              id="message" 
              type='text' 
              value={ message } 
              onChange={handleMessageChange} 
                />
                  <input 
                  id='submit' 
                  type="submit" 
                  value="Post!" 
                />
            {errorMessage && (
            <p className="error"> {errorMessage} </p>)}
          </form>
          <div id='feed' role="feed">
          {typeof searchQuery !== "undefined"
              ? searchQuery.map((post) => <Post
                post={post}
                token={token}
                setPosts={ setPosts }
                newPosts={posts}
                setSearchQuery={setSearchQuery}
                key={post._id} /> ).reverse()
                
              : posts.map((post) => <Post
                post={post}
                token={ token }
                setPosts={ setPosts }
                newPosts={posts}
                setSearchQuery={setSearchQuery}
                key={post._id} />).reverse()}
          </div>
        </>
        
      )
      
    } else {
      navigate('/login')
    }
  
}

export default Feed;

