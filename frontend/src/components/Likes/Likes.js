import React, { useEffect, useState } from 'react';
import likedThumbsUp from '../../images/likedThumbsUp.png';
import unLikedThumbsUp from '../../images/unlikedThumbsUp.png';

const Likes = ({ likes, parent }) => {

  // const [alreadyLiked, setAlreadyLiked] = useState(false)
  const [likers, setLikers] = useState(likes)
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
        body: JSON.stringify({
          'article_id': parent._id,
          'username': username
        })
      })
      if (response.status !== 201) { console.log("could not add like") }
      else {
        let data = await response.json()
        window.localStorage.setItem("token", data.token)
        setLikers(data.post.likes)
      }
  }

  const userHasLiked = (likers) => {
    if (!likers) { return false } // error handling for empty likes array
    let result = false
    likers.forEach((liker) => {
      if (liker === username) {result = true}
    })
    return result
  }

  let likeEmoji
  
  if(userHasLiked(likers)){
    likeEmoji = <img src={likedThumbsUp} alt="thumbs up liked emoji" />
  } else {
    // data-cy set here since this element responds to .click() in cypress
    likeEmoji = <img src={unLikedThumbsUp} data-cy="like-button" alt="thumbs up unliked emoji" onClick={handleButtonClick}/>
  }

  let likesLabel // singular or plural...

  if (likers && (likers.length === 1)) {
    likesLabel = "like"
  } else {
    likesLabel = "likes"
  }

  return(
    <div className="likes">
      <div id="like-count" data-cy="like-count"> {likers && likers.length} {likesLabel} </div>
      <div id="like-button" >{ likeEmoji }</div> 
    </div>
  )
}

export default Likes;
