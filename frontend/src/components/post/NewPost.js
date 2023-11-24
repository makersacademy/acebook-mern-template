import React, { useState } from 'react';

const NewPost = ({ navigate, posts, setPosts, setReRender, fetchPosts }) => {

  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [emptyFieldsError, setEmptyFieldsError] = useState("");
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!content) {
      setErrorMessage("Your post cannot be blank"); 
      return;
    } else {
      setEmptyFieldsError("");
    } 

    fetch( '/api/posts', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ content: content, token: token  })
    })
      .then(async response => {
        if(response.status === 201) {
            let data = await response.json()
            setToken(data.token)
            setReRender(true)
            setContent("");
            fetchPosts();
        }
      })
  };


  const handleContentChange = (event) => {
    setContent(event.target.value)
  }

    return (
      <form onSubmit={handleSubmit}>
        <h2>New Post</h2> 
        <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
          <textarea placeholder="Content" id="content" type='text' value={ content } onChange={handleContentChange} rows="4" style={{width: '100%' }}/>
          </div>
          <input role='submit' id='submit' className='primary-btn' type="submit" value="Submit" />
          {emptyFieldsError && <p style={{ color: 'red' }}>{emptyFieldsError}</p>}
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </form>
    );
}

export default NewPost;

