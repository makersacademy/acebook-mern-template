import React, { useState } from 'react'

// const Post = require('../../models/post');

const AddComment = ({ post }) => {
  const [comment, setComment] = useState('');
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const handleSubmit = async (event) => {
    event.preventDefault();

      if (token) {

        console.log(`${post._id}`) // VISIBILITY
        const response = await fetch(`/posts/${post._id}`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            // Post, { $push: { comments: comment } },
            message: comment,
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
          // navigate('/posts'); // navigate is not present in this component
        }
      }
  }

  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="comment">Add a comment</label>
        <input placeholder='Comment' id="comment" type='text' value={comment} onChange={handleCommentChange} />
        <input role='submit-button' id='submit' type="submit" value="Submit" />
      </form>
    </>
  )
}

export default AddComment
