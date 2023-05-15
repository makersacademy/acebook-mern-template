import React, {useState} from 'react';

const NewPostForm = ({onSubmit}) => {
  const [newPost, setNewPost] = useState("");
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const submitPost = (event) => {
    // When you use event.preventDefault(), it needs to be at the very top of the function, otherwise it doesn't prevent the page from reloading. So the page was
    // forever reloading and then running the tests again and again.
    event.preventDefault()
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
        setNewPost(""); // clear the input field - set as empty string so type doesn't change
      })
      // executes the callback function whenever form is submitted
      onSubmit()
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
