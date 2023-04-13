import React from 'react';
import './NewPostForm.css'

const NewPostForm = ({newImg, newPost, handleNewPostChange, handleSubmit, handleImg}) => {
  
  return (
    <>
      <form className="new-post-form" onSubmit={handleSubmit} encType='multipart/form-data'>
        <input type='text' id='post' className="text-field" placeholder="What do you have in mind?" value={newPost} onChange={handleNewPostChange} />
        <div id="upload-photo-btn-container">
          <input type='file' className="upload-photo-btn" accept=".png, .jpg, .jpeg" id='img' onChange={handleImg} />
          <i className="fa-regular fa-image fa-3x"></i>
          <div>
            {newImg ? <div id='selected-file-notification'></div> : null }
          </div>
        </div>
        <input className="post-submit-btn" type="submit" value="Send"/>
      </form>
    </>
  );
}

export default NewPostForm;