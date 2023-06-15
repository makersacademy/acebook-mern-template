import React, { useEffect, useState } from 'react';
import Post from '../post/Post'
import './Feed.css';

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

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
        })
    } else {
      navigate('/login')
    }
  }, [])
    
  const postsArray = posts.map((post) => ( 
    <div className="post" key={ post._id }>
      <Post post={ post }  />
    </div> 
  ));

  // const logout = () => {
  //   window.localStorage.removeItem("token")
  //   navigate('/login')
  // }
  
    if(token) {
      return(
        <>
          <div className="lake">
            {posts.map((post) => (
              <div
                className="duck"
                key={post._id}
                style={{
                  left: `${Math.floor(Math.random() * 80)}%`,
                  top: `${Math.floor(Math.random() * 80)}%`,
                }}
              ></div>
            ))}
            <div className="overlay">
              <div className="post-list">
                <div id='feed' role="feed">
                  { postsArray.reverse().map(a => a) }
                </div>
              </div>
            </div>
          </div>
        </>
      )
    }
}

export default Feed;
