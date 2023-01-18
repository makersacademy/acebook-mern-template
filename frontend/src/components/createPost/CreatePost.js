import React, { useState } from 'react';
import '../feed/Feed.css';

const CreatePost = ({setUpdated}) => {
  const [body, setBody] = useState("");
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  
  
  const handleSubmit = (event) => {
    
    event.preventDefault();
    if(token && body) {
      fetch( '/posts', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          'author': window.localStorage.getItem('user_id'),
          'message': `${body}`
        })
      }).then(() => {
        setUpdated(true)
        setBody('')})
      }
  }
  
  return (
    <div id='create-post'>
      <h2>Create Post</h2>
      <form id ='input' onSubmit={handleSubmit}>
        <textarea id='input' rows="4" value={body} onChange={(event) => setBody(event.target.value)} />
        <button id="like-button" type="submit" value="Submit">Post</button>
      </form>
    </div>
  );
}
 
export default CreatePost;