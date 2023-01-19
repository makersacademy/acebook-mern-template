import { useState } from 'react';
import './CreatePost.css'
import Card from '../Helpers/Card'
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
    <Card>
    <form onSubmit={handleSubmit}>
      <div className='create-form'>
      <h3>Name</h3>
      <input
        type="text"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      /> 
      <button type="submit">Post</button>
      </div>
    </form>
    </Card>
  </div>
  );
};

export default Create;
