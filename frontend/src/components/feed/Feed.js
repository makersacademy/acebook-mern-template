import React, { useEffect, useState } from 'react';
import Post from '../post/Post'
import './Feed.css'

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [message, setMessage] = useState("")
  const [image, setImg] = useState("")
  const user_id = window.localStorage.getItem("user_id");
  console.log(user_id)
  

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (image === "") {
      fetch( '/posts', {
        method: 'post',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: message, photo: "", postedBy: user_id})
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
          body: JSON.stringify({message: message, photo: data.url, postedBy: user_id })
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
          console.log(data.posts)
        })
    }
    // eslint-disable-next-line
  }, [])
    
  const logout = () => {
    window.localStorage.removeItem("token")
    navigate('/login')
  }

  if(token) {
    return(
      <>
      <button onClick={logout}>
        Sign Out
      </button>
      <div className="flexbox">
        <div className="item">
          <br></br>
          <br></br>
          <form onSubmit={(e) => handleSubmit(e)} className="homePage" id="messageForm">
            <label>Write your post...</label>
            <br></br>
            <textarea name="message" className="message" form="messageForm" value={ message } onChange={(e) => setMessage(e.target.value)}></textarea>
            <br></br>
            <br></br>
            <label className="custom-file-upload">
            <input type="file" id="chooseImg" onInput={(e) => setImg(e.target.files[0])}></input>
              Add an image
            </label>
            <br></br>
            <br></br>
            <input type="submit" id="submit" value="Submit Post"></input>
          </form>
        <div id='feed' role="feed">
            {posts.map(
              (post) => ( <Post post={ post } key={ post._id } /> )
            ).reverse()
            }
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