import { useState } from 'react';

const Create = (props) => {
  const [body, setBody] = useState('');
  const token = window.localStorage.getItem('token');
  const userId = window.localStorage.getItem('user_id');

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('/posts', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ user_id: userId, message: body }),
    }).then(() => props.setPostAdded(true));

    setBody('');
  };

  return (
    <div className="create">
      <h2>Add a New Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></input>
        <button type="submit">Post me</button>
      </form>
    </div>
  );
};

export default Create;
