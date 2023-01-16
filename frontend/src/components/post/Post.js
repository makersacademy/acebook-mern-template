import React, {useState, useEffect } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
/// use post.author to look up users with that id and get there name


const Post = ({post}) => {
  const [userName, setUserName] = useState(null)
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [error, setError] = useState(null)

  useEffect(() => {
    if(token) {
      fetch(`/users/${post.author}`)
        .then(response => response.json())
        .then(async data => {
          // window.localStorage.setItem("token", data.token)
          // setToken(window.localStorage.getItem("token"))
          setUserName(data.user.name);
        })
    }
  }, [])

  //  logged in user id  = window.localStorage.getItem("user_id")
  

  return(
    <div id="post">
      <article data-cy="post" key={ post._id }>
       <p id="userName">{userName}</p><p>{ post.message }</p>
       <p className='timePosted'>Posted: {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</p>
       <p> Likes: {post.likes.length} <button id="like-button">&#128077; Like</button></p>
      </article>
    </div>
  )

  
}

export default Post;


// {post.likes.includes(window.localStorage.getItem('user_id')) ? 'Unlike' : 'Like'}