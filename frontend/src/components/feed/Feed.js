import React, { useEffect, useState } from 'react';
import Post from '../post/Post'
import './Feed.css'

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [message, setMessage] = useState("")
  const [image, setImg] = useState("")
  const [search, setSearch] = useState("");
  const user = JSON.parse(window.localStorage.getItem("user"));
  
  const handleSubmit = async (event) => {
    event.preventDefault()
    if (image === "") {
      fetch( '/posts', {
        method: 'post',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: message, photo: "", postedBy: user._id})
      })
      .then(res => res.json())
      .then(data => {
        let postArr = data.post
        let pushing = posts.concat(postArr)
        // console.log('this is:', postArr)
        setPosts(pushing)
      })
    } else {
      const data = new FormData()   // << learn more about FormData / used to upload data
      data.append("file", image)
      data.append("upload_preset", "acebook")
      data.append("cloud_name", "dhocnl7tm")
      await fetch("https://api.cloudinary.com/v1_1/dhocnl7tm/image/upload", {
        method: "post",
        body: data
      })
      .then(res => res.json())
      .then(data => {
        fetch( '/posts', {
          method: 'post',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({message: message, photo: data.url, postedBy: user._id })
        })
        .then(res => res.json())
        .then(data => {
        let postArr = data.post
        let pushing = posts.concat(postArr)
        console.log('this is:', postArr)
        setPosts(pushing)
        })
      })
  }
}


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
    }
    // eslint-disable-next-line
  }, [])
  
  const handleSearchChange = (event) => {
    setSearch(event.target.value)
    const search = event.target.value
    console.log("change handler: ",event.target.value)
    console.log(search)
  }


  const submitSearchHandler = (event) => {
    event.preventDefault()
    console.log("submmit handler: ",event.target.value)
    fetch(`/posts/search?searchTerm=${event.target.value}`, { 
      headers: {
        'Authorization': `Bearer ${token}`,
        // 'searchItem': event.target.value 
      }
    })
      .then(response => response.json())
      .then(async data => {
        window.localStorage.setItem("token", data.token)
        setToken(window.localStorage.getItem("token"))
        setPosts(data.posts);
        console.log(data.posts)
        // navigate("posts/search")
        
      })
  
  // eslint-disable-next-line
}

  const logout = () => {
    window.localStorage.removeItem("token")
    navigate('/login')
  }

  const feed = () => {
    navigate('/posts')
  }

  const profile = () => {
    navigate('/profile')
  }

  if(token) {
    return(
      <>
      <header>
        <div className="container">
        <img src="https://i.imgur.com/kjtUiie.png" alt="logo" className="logo"></img>
          <nav>
            <ul>
              <li>
                <div className="search-container">
                  <form className="SearchBar">
                    <input type="text" placeholder="Search.." name="search" value={ search } onChange={handleSearchChange}></input>
                    <button onClick={submitSearchHandler} id='submit' type="submit" className="searchButton" value= { search }>Search</button>
                  </form>
                </div>
              </li>
              <li onClick={feed}>Feed</li>
              <li onClick={profile}>My Profile</li>
              <li onClick={logout}>Log Out</li>
            </ul>
          </nav>
        </div>
      </header>

<div id="feed-wrap">
      <div className="feed-flex">
          <div className='feed-content'>
          <div className='feed-wrap'>
          <form onSubmit={(e) => handleSubmit(e)} className="homePage" id="messageForm">
            <div className='message-div'>
            <label className='message-label'>What do you want to share, {user.firstName}?</label>
            <br></br>
            <textarea name="message" className="message" form="messageForm" value={ message } onChange={(e) => setMessage(e.target.value)}></textarea>
            <br></br>
            <br></br>
            <div className='post-btn-div'>
            <label className="custom-file-upload">
            <input type="file" id="chooseImg" onInput={(e) => setImg(e.target.files[0])}></input>
            <h4 className='add-img'>Add image</h4>
            </label>
            <br></br>
            <label className="custom-file-upload">
              <input type="submit" id="chooseImg"></input>
            <h4 className='submit-post-btn'>Post!</h4>
            </label>
            </div>
            </div>
          </form>
          <div id='feed' role="feed">
            {posts.map(
              (post) => ( <Post post={ post } key={ post._id } /> )
            ).reverse()
            }
          </div>

          </div>
        </div>
      </div>
      </div>
      </>
    )
  } else {
    navigate('/signin')
  }

}

export default Feed;