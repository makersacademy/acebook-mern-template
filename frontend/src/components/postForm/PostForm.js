import { useState } from "react"

export default function PostForm () {
  const [message, setMessage] = useState('')
  const token = window.localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault() // Prevents default action of refreshing the page

    console.log(JSON.stringify(message))
    const response = await fetch('/posts/', {
      method: 'post',
      body: JSON.stringify(message),
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
      setMessage('')
    }
  }

  return (
    <div className="form-container">
      <form className='create-message-form' onSubmit={handleSubmit}>
        <label for='text-box'>Write your message here:</label>
        <input
          type="text"
          className="text-box"
          onChange={(event) => setMessage(event.target.value)}
          value={message}
          />
        <button>Add</button>
      </form>
    </div>
  )
}
