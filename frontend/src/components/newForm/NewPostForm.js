import React from 'react';
import './NewPostForm.css'

const NewPostForm = ({newPost, handleNewPostChange, new_post}) => {
  
  return (
    <>
      <form className="new-post-form">
        <input type='text' id='post' className="text-field" placeholder="What do you have in mind?" value={newPost} onChange={handleNewPostChange}></input>
        <button className="post-photo-upload"><i className="fa-regular fa-image fa-2x"></i></button>
        <button className="post-submit-btn" onClick={new_post}>Send</button>
      </form>
    </>
  );
}

export default NewPostForm;