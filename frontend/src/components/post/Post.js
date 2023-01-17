import React, { useState, useEffect } from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import useLikes from './useLikes'
/// use post.author to look up users with that id and get there name

const Post = ({ post, setUpdated }) => {
  const [userName, setUserName] = useState(null)
  const [token, setToken] = useState(window.localStorage.getItem('token'))
  const [error, setError] = useState(null)

  const hasBeenLiked = () => {
    return post.likes.includes(window.localStorage.getItem('user_id'))
  }

  const handleLikes = (event) => {
    event.preventDefault()
    if (token) {
      fetch(`posts/${post._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          field: 'likes',
          value: window.localStorage.getItem('user_id'),
        }),
      }).then((response) => {
        setUpdated(true)
      })
    }
  }

  useEffect(() => {
    if (token) {
      fetch(`/users/${post.author}`)
        .then((response) => response.json())
        .then(async (data) => {
          // window.localStorage.setItem("token", data.token)
          // setToken(window.localStorage.getItem("token"))
          setUserName(data.user.name)
        })
    }
  }, [])

  //  logged in user id  = window.localStorage.getItem("user_id")

  return (
    <div id="post">
      <article data-cy="post" key={post._id}>
        <p id="userName">{userName}</p>
        <p>{post.message}</p>
        <p className="timePosted">
          Posted:{' '}
          {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
        </p>
        <button onClick={handleLikes} id="like-button">
          {hasBeenLiked() ? (
            <>&#128078; Unlike {post.likes.length > 0 && post.likes.length}</>
          ) : (
            <>&#128077; Like {post.likes.length > 0 && post.likes.length}</>
          )}
        </button>
      </article>
    </div>
  )
}

export default Post

// {post.likes.includes(window.localStorage.getItem('user_id')) ? 'Unlike' : 'Like'}
