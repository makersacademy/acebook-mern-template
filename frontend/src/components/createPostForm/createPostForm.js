import React, { useState } from 'react';
//userid for post

const CreatePostForm = ({ token, id }) => {
  const [message, setMessage] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();

    alert('Post submitted');
    setMessage('');
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        {console.log('token: ', token)}

        {console.log('i am the id: ', id)}
        <input
          id='post-input'
          placeholder='Whats on your mind?'
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          required
        ></input>
        <button id='submit' type='submit'>
          Submit post
        </button>
      </form>
    </>
  );
};

export default CreatePostForm;
