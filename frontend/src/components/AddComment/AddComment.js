import React, { useState } from 'react'
import './AddComment.css';

// const Post = require('../../models/post');

const AddComment = ({ post }) => {
  const [comment, setComment] = useState('');
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const handleSubmit = async (event) => {
    event.preventDefault();

      if (token) {
        const response = await fetch(`/posts/${post._id}`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            $push: {
              comments: {
                comment: comment,
                author: window.localStorage.getItem('username'),
              }
            },
          })
        })
        console.log(response)
        if (response.status !== 200) {
          console.log("oops")
          // navigate('/login')
        } else {
          console.log("yay!")
          console.log(`res = ${response}`)
          console.log(response)
          let data = await response.json()
          console.log(`token = ${data.token}`)
          console.log(data) // VISIBILITY
          window.localStorage.setItem("token", data.token)
          
          setToken(window.localStorage.getItem("token"));
          setComment("")
        }
      }
  }

  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* <label htmlFor="comment">Add a comment</label> */}
        <input data-cy="comment" className="input-field" 
          placeholder='Comment' id="comment" type='text' 
          value={comment} onChange={handleCommentChange}
        />
        <input data-cy="submit" className="input-button" 
          role='submit-button' id='submit-comment' 
          type="submit" value="Add comment"
        />
      </form>
    </>
  )
}

export default AddComment
