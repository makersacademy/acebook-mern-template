import React, {useState} from 'react';

const NewCommentForm = () => {
  const[newComment, setNewComment] = useState("");
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const handleComment = (e) => {
    setNewComment(e.target.value);
  };

  const submitComment = (event) => {
    if(token) {
      fetch('/comments', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({"message": newComment})
      })
      .then(response => response.json())
      .then(async data => {
        window.localStorage.setItem("token", data.token)
        setToken(window.localStorage.getItem("token"))
        // console.log(data.message)
        event.preventDefault() // don't do the default functionality of the form - which would submit and reload the page
        // console.log(newPost) // connect to database, update data
        setNewComment(""); // clear the input field - set as empty string so type doesn't change
      })
    }
  }
  

  return(
    <form onSubmit={submitComment}>
      <input id="new-comment-field" onChange={handleComment} type="text" value={newComment} />
      <button id="new-comment-button" type="submit">Submit</button>
    </form>
  )

}

export default NewCommentForm;
