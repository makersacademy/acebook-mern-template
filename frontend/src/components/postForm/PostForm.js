import { useState } from "react"

export default function PostForm () {
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
      setMessage('')
    }
  }

  // Handles value of the text input field.
  const handleChange = (event) => {
    setMessage(event.target.value)
  }
  // Actual JSX
  return (
    <div className="form-container">
      <form className='create-message-form' onSubmit={handleSubmit}>
        <label for='text-box'>Write your message here:</label>
        <input
          type="text"
          className="text-box"
          onChange={handleChange}
          value={message}
          required
          />
        <button>Add</button>
      </form>
    </div>
  )
}
