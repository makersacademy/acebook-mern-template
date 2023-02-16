import React, { useState } from 'react';
//userid for post

const CreateCommentForm = ({
  navigate,
  token,
  user_id,
  post_id,
  setReload,
}) => {
  const [message, setMessage] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await fetch('/comments', {
      method: 'post',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message,
        user_id: user_id,
        post_id: post_id,
      }),
    });
    if (response.status !== 201) {
      navigate('/posts');
    } else {
      setMessage('');
      navigate('/posts');
      setReload(true);
    }
  };
  return (
    <>
      <form
        className='create-comment-form'
        onSubmit={handleSubmit}
        data-cy='comment-input'
      >
        <input
          id={`comment-input-${post_id}`}
          placeholder='What do you think of this post?'
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          required
        ></input>
        <button
          id={`submit-comment-${post_id}`}
          type='submit'
          data-cy='comment-submit'
        >
          Submit Comment
        </button>
      </form>
    </>
  );
};

export default CreateCommentForm;
