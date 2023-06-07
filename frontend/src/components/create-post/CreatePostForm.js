import { useState } from "react"


const CreatePostForm = ({ navigate }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    
      await fetch('/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify({
        message: message
      })
    })
    navigate('/posts')
  }

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="E.G. How's your day?" id="message" type="text" value={message} onChange={handleMessageChange} />
      <input role='submit-button' id='submit' type="submit" value="Post!" />
    </form>
  )
}

export default CreatePostForm;