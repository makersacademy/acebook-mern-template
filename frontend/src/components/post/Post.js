import React from 'react';
import { useState } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import Card from '../Helpers/Card';
import './Post.css';

const Post = ({ post, setPostAdded }) => {
  const [edit, setEdit] = useState(false)
  const [content, setContent] = useState(post.message);
  const token = window.localStorage.getItem('token');
  const userId = window.localStorage.getItem('user_id');
  
  const handleEdit = (content, e) => {
    e.preventDefault();
    setEdit(true);
    console.log(edit);
  }

  const handleSave = (e) => {
    e.preventDefault();
    console.log(content)
    console.log(post._id);
    fetch('/posts/' + post._id, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ user_id: userId, message: content, post_id: post._id })
      
    }).then(response => {response.json()}).then(data => {console.log(data)});

    
    setEdit(false);
    setPostAdded(true);
  }

  if (edit) {
  return (
    <div>
      <Card>
        <div className='input'>
        <input 
          type="text"
          value={content}
          onChange={(e) => {setContent(e.target.value)}}/>
        <button onClick={handleSave}>Save</button>
        </div>
        <div className="post-data">
        <p>{post.user_id.name},&nbsp;</p>
        <p>
          {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
        </p>
      </div>
      </Card>

      
    </div>
  )} else {
    return (
      <div>
      <Card>
        <article data-cy="post" key={post._id}>
          {post.message}
          <button onClick={ (e) => {handleEdit(post.message, e)} }>Edit</button>
        </article>
        
        <div className="post-data">
        <p>{post.user_id.name},&nbsp;</p>
        <p>
          {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
        </p>
      </div>
      </Card>
    </div>
    )
  };
};

export default Post;
