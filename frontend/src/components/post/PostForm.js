import React, { useState } from 'react'

const PostForm = ({ onSubmit }) => {
  const [content ,setContent] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(content);
    setContent('')
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea 
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's your message, Ace?" 
        rows="3"
        required 
      />
        <button type="submit">Post</button>
    </form>
  )
}

export default PostForm;
