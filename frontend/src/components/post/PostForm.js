import React, { useState } from 'react'

const PostForm = ({ onSubmit }) => {
  const [content, setContent] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(content);
    setContent('')
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
        <button type="submit">Post</button>
    </form>
  )
}

export default PostForm;
