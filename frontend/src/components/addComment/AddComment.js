import React, { useState } from 'react';
import '../feed/Feed.css';
import comments from '../post/Post'

const AddComment = ({setUpdated}) => {
  const [body, setBody] = useState("");
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  
  
  const handleSubmit = (event) => {
    
    event.preventDefault();
    if(token) {
      fetch( '/posts/:id', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          
        },
        body: JSON.stringify({
          //'author': window.localStorage.getItem('user_id'),
          'field': 'comments',
          'value': `${body}`
        })
      }).then(() => {
        //setUpdated(true)
        setBody('')})
      }
  }
  
  return (
    <div>
    <p>Comments:</p>
        <div id='comments' role="comments">
          {console.log(comments)}
        <p>{comments}</p>
              <p>...</p>
        </div>
    <div id='add-comment'>
      <h2>Add Comment</h2>
      <form id ='input' onSubmit={handleSubmit}>
        <textarea id='input' rows="2" value={body} onChange={(event) => setBody(event.target.value)} />
        <button id="add" type="submit" value="Submit">Comment</button>
      </form>
    </div>
    </div>
  );
}
 
export default AddComment;