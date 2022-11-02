import React, { useState } from 'react';

const PostForm = ({ navigate }) => {
  const [message, setMessage] = useState("");
  const [token, setToken] = useState(window.localStorage.getItem("token"));
 
  useEffect(() => {
    if(token) {
      fetch("/createpost", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(async data => {
          window.localStorage.setItem("token", data.token)
          setToken(window.localStorage.getItem("token"))

        })
    }
  }, [])
  
  const handleMessageChange = (event) => {
    setMessage(event.target.value)
  }


    return (
      <form onSubmit={handleSubmit}>
        <p>Create a new post</p>
        <input placeholder='Message' id="message" type='text' value={ message } onChange={handleMessageChange} />
        <br />
        <input role='submit-button' id='submit' type="submit" value="Submit" />
        <div class="footer">
         <p>Ⓒ The Incredibles</p>
      </div>
      </form>
    );
}

export default PostForm;