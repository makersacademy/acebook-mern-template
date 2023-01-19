import React from 'react';
import { useState } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import Card from '../Helpers/Card';
import './Post.css';
import { Link } from 'react-router-dom';

const Post = ({ post, setPostAdded }) => {
  const [edit, setEdit] = useState(false)
  const [content, setContent] = useState(post.message);
  const token = window.localStorage.getItem('token');
  const userId = window.localStorage.getItem('user_id');
  
  const handleEdit = (content, e) => {
    e.preventDefault();
    setEdit(true);
  }

  const handleDelete = () => {
    fetch('/posts/' + post._id, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ post_id: post._id })
    }).then(response => {response.json()}).then(data => { console.log(data) })

    setPostAdded(true);
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
  
  const handleLike = () => {
    if (userId) {
      fetch('/posts', {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ post_id: post._id, user_id: userId }),
      }).then(() => setPostAdded(true));
    }
  };

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
      <div className="post">
      <Card>
        <div className="header">
        <div id='username'>
          <Link to={`/users/${post.user_id._id}`}>{post.user_id.name}</Link>
          <p>
            &nbsp;&nbsp;{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
          </p>
          </div>
          <div className='edit-buttons'>
          <button id='edit' onClick={ (e) => {handleEdit(post.message, e)} }>Edit</button>
          <button id='delete' onClick={ handleDelete }>Delete</button>
          </div>
        </div>
        <article data-cy="post" key={post._id}>
          <div id='message'>
          {post.message}
          </div>
        </article>
        <span>
          {post.likes.length > 1
            ? `${post.likes.length} people liked this`
            : post.likes.length === 1
            ? `${post.likes.length} person liked this`
            : 'No likes'}
        </span>
        <hr></hr>
        <div className='bottom-buttons'>
        <button id="like-button" onClick={handleLike}>
          Like
        </button>
        <button id="comment-button" onClick={handleLike}>
          Comment
        </button>
        <button id="share-button" onClick={handleLike}>
          Share
        </button>
        </div>
        <hr></hr>
      </Card>
    </div>
    )
  };
};

export default Post;
