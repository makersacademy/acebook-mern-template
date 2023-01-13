import { useState } from 'react';

const Create = () => {
  const [body, setBody] = useState('');

  const handleSubmit = () => {
    // e.preventDefault();
    // console.log(window.localStorage.getItem('token'));

    fetch('/posts', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ message: body }),
    });

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
