import React, { useState } from 'react'

const PostForm = ({ onSubmit }) => {
  const [content, setContent] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault(); //prevents submitting empty form
    onSubmit(content);
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea 
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder="What's your message, Ace?" 
        rows="2"
        required 
      />
        <input id='submit' type="submit" value="Post" />
    </form>
  )
}

export default PostForm;
