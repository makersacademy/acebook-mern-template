import { useState } from "react";

export default function FriendsForm () {
  // Name of the person you're searching for.
  const [friend, setFriend] = useState('')
  const token = window.localStorage.getItem("token");

  const handleSubmit = async (error) => {
    error.preventDefault();

    const response = await fetch('/friends/', {
      method: 'post',
      body: JSON.stringify({friend}),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })

    const json = await response.json()
    if (!response.ok) {
      console.log('They do not want to be friends with you', json)
    }
    if (response.ok) {
      // If form sent successfully then it resets the input field.
      setFriend('')
    }
  }

  return (
    <div className='friends-form-container'>
      <form className='friends-form' onSubmit={handleSubmit}>
        <h2>Add Friends</h2>
        <input
          placeholder='Search using their name'
          type='text'
          className='text-box'
          onChange={(e) => setFriend(e.target.value)}
          value={friend}
        />
        <button className='friends-form-btn'>Add</button>
      </form>
    </div>
  )
}