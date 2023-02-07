import React, { useState } from 'react';

const CreatePostForm = () => {
  const [message, setMessage] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('hello');
    alert('Post submitted');
    setMessage('');
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        {message}
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
