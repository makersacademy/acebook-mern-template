import React, { useState } from 'react';
//userid for post

const CreatePostForm = ({ navigate, token, id, setReload }) => {
  const [message, setMessage] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();

    let response = await fetch('/posts', {
      method: 'post',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: message, user_id: id }),
    });

    if (response.status !== 201) {
      console.log('oops');
      alert('Error try again');
      navigate('/posts');
    } else {
      console.log('yay');

      let data = await response.json();
      console.log(data);
      alert('Post submitted');
      setMessage('');
      navigate('/posts');
      setReload(true);
    }
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
