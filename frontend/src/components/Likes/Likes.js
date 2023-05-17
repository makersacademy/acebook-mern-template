import React { useEffect, useState } from 'react';

const Likes = ({ likers, parent }) => {

  const [username, setUsername] = useState(window.localStorage.getItem('username'));
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const handleButtonClick = async (event) => {
    event.preventDefault();
    // todo: update this to `/posts/like_${parent.type}`
    const response = await fetch('/posts/likes', {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: {
        `${parent.type}_id`: parent._id,
      }
    })
    if (response.status !== 200) { console.log("could not add like") }
    else {
      let data = await response.json()
      window.localStorage.setItem("token", data.token)
      // setToken(window.localStorage.getItem("token"))
    }
  }

  const userHasLiked = (likers) => {
    likers.forEach((liker) => {
      if (liker.username === username) { return true }
    })
  }

  let likeEmoji 

  if(userHasLiked(likers)){
    likeEmoji = <img src="public/thumbsUpLikedEmoji.png" alt="thumbs up liked emoji" />
  } else {
    likeEmoji = <img src="public/thumbsUpUnLikedEmoji.png" alt="thumbs up unliked emoji" onClick={handleButtonClick}/>
  }

  return(
    <div className="likes">
      <div id="like-count"> {likers.length} likes </div>
      <button id="like-button" >{ likeEmoji }</button> 
    </div>
  )
}