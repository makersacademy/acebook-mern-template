import { useState } from "react"

export default function PostForm (props) {
  // Component state
  const [message, setMessage] = useState('')
  // Feed already resets the token for us.
  const token = window.localStorage.getItem("token");

  const handleSubmit = async (error) => {
    error.preventDefault() // Prevents default action of refreshing the page

    const response = await fetch('/posts/', {
      method: 'post',
      body: JSON.stringify({message}),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
    const json = await response.json()
    if (!response.ok) {
      console.log('Message couldnt send', json)
    }
    if (response.ok) {
      // If form sent successfully then it resets the input field.
      // Changes state of outter component to reload the list of posts.
      setMessage('')
      props.changePosts(message);
    }
  }

  // Actual JSX
  return (
    <div className="form-container">
      <form className='create-message-form' onSubmit={handleSubmit}>
        <label for='text-box'>New Message</label>
        <input
          type="text"
          className="text-box"
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What's on your mind?"
          value={message}
          required
          />
        <button
          className='signup-form-btn'
          >Add</button>
      </form>
    </div>
  )
}
