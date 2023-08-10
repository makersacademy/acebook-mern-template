
import React, { useEffect, useState } from 'react';
import Post from '../post/Post';
import './Feed.css'

const Feed = ({ navigate, searchQuery, setSearchQuery }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [message, setMessage] = useState("");
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
        .then((response) => response.json())
        .then(async (data) => {
          window.localStorage.setItem("token", data.token);
          setToken(window.localStorage.getItem("token"));
          setPosts(data.posts);
        });
    }

  }, [])

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
  
  // let postList = posts.map(
  //   (post) => ( 
  //   <p> 
  //     <Post 
  //       post={ post } 
  //       key={ post._id }
  //       token={ token }
  //       setPosts={ setPosts }
  //       newPosts = {posts}
  //     /> 
  //     </p>)
  //   )
  
  

    if(token) {
      return(
        <>
          <button onClick={logout}>
            Logout
          </button>
          <h1>Posts</h1>
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
          {/* searchbutton oncllick show - searchQuery.posts.map((post) => <Post post={post} key={post._id} 
          returntoallposts button shows posts.map((post) => <Post post={post} key={post._id} />).reverse()}
           */}
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

