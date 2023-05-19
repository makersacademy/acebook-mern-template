import React, {useState} from 'react';
import './CommentForm.css'

const NewCommentForm = ({post_id, toggleRefresh}) => {
  const[newComment, setNewComment] = useState("");
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const handleComment = (e) => {
    setNewComment(e.target.value);
  };

  const submitComment = (event) => {
    event.preventDefault()
    if(token) {
      fetch('/posts/comments/', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({post_id: post_id, "message": newComment})
      })
      .then(response => response.json())
      .then(async data => {
        window.localStorage.setItem("token", data.token)
        setToken(window.localStorage.getItem("token"))
        console.log(data.message)
         // don't do the default functionality of the form - which would submit and reload the page
        // console.log(newPost) // connect to database, update data
        setNewComment(""); // clear the input field - set as empty string so type doesn't change
      })
      .then(() => toggleRefresh())
    }
  }
  

  return(
    <>
    <div className='comment-form-container'>
      <label for='comment-form'>Make a Comment</label>
      <form className='comment-form' onSubmit={submitComment}>
        <input id="new-comment-field" onChange={handleComment} type="text" value={newComment}/>
        <button id="new-comment-button" type="submit">Comment</button>
      </form>
    </div>
    </>
  )

}

export default NewCommentForm;
