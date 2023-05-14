import React, {useState} from 'react';

const NewPostForm = ({}) => {
  const [newPost, setNewPost] = useState("");
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const submitPost = (event) => {
    if(token) {
      fetch('/posts', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({"message": newPost})
      })
      .then(response => response.json())
      .then(async data => {
        window.localStorage.setItem("token", data.token)
        setToken(window.localStorage.getItem("token"))
        // console.log(data.message)
        event.preventDefault() // don't do the default functionality of the form - which would submit and reload the page
        // console.log(newPost) // connect to database, update data
        setNewPost(""); // clear the input field - set as empty string so type doesn't change
      })
    }
  }

    const onChangePostInput = (event) => {
      setNewPost(event.target.value)
    }

  return(
    <form onSubmit={submitPost}>
      <input id="new-post-field" onChange={onChangePostInput} type="text" value={newPost} />
      <button id="new-post-button" type="submit">Submit</button>
    </form>
  )
}
export default NewPostForm;
