import React, { useState } from 'react';

const CreatePost = () => {
  const [body, setBody] = useState("");
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if(token) {
      fetch( '/posts', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          'message': `${body}`
        })
      }).then(window.location.reload())
      }
  }
  
  return (
    <div className="createPost">
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(event) => setBody(event.target.value)} />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
 
export default CreatePost;