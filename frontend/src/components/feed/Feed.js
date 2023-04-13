import React, { useEffect, useState } from 'react';
import Post from '../post/Post'

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [message, setMessage] = useState("")
  const [author] = useState(window.localStorage.getItem("username"));

  useEffect(() => {
    if(token) {
      fetch("/posts", {
        headers: {

          //makes sure a vaild token is present
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(async data => {
          window.localStorage.setItem("token", data.token)
          setToken(window.localStorage.getItem("token"))
          ///console.log()

          //gets all posts and puts them in reverse order
          setPosts(data.posts.reverse());
        })
    } 
  }, [])

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  }

  
  // NEW POST -----------------------------
  const handlePostSubmit = (event) => {
    event.preventDefault();
    fetch('/posts', {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({message, author})
    })
      .then((response) => response.json())
      .then((data) => {
        //sets posts to all posts + the new post 
          setPosts([...posts, data])
          setMessage('')

        // this refreshes the whole window which is not ideal.
          window.location.reload();
      })
      .catch((error) => console.error(error));
  };

  // handleLikeButton ??
    // stringify (likes)
    //setLikes(post.likes + 1)
    //reload

  // LOGOUT --------------------------------
  const logout = () => {
    window.localStorage.removeItem("token")
    navigate('/')
  }

  // RENDER POSTS ------------------------
  const renderPosts = () => {
    return (
      <div>
        {
          posts.map(                              // the styling of the div below might be better applied inside Feed.css
          (post) => (                            
            <div style={{border: 'solid', width: 500, margin: 10, padding: 10}}>
              <Post post={post} key={ post._id } />
            </div> 
          ))
        }
      </div>
    )
  }

  // RENDER CREATE POST FORM -----------------
  const renderPostForm = () => {
    return (
      <form onSubmit={handlePostSubmit}>
        <input type="text" name="message" value={message} onChange={handleMessageChange}/>
        <button type="submit">Post</button>
      </form>
    )
  }
  
    if(token) {
      return(
        <>
          <h2>Acebook</h2>
          <button onClick={logout}>Logout</button>
          {renderPostForm()}
          {renderPosts()}
        </>
      )
    } else {
      navigate('/login')
    }
}

export default Feed;