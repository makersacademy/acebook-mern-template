import React, { useState } from 'react';
import './Delete.css';

const Delete = ({toggleRefresh, post_id}) => {
  
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const handleDelete = async () => {
    if(token) {
      fetch('/posts/delete', {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({post_id: post_id})
      })
      .then(response => response.json())
      .then(async data => {
        window.localStorage.setItem("token", data.token)
        setToken(window.localStorage.getItem("token"))
      })
      // executes the callback function whenever form is submitted
      toggleRefresh()
    }
  }

  return (
    <>
    <button onClick={handleDelete} className="delete-button">❌</button>
    </>
    )
}

export default Delete